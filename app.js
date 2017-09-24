const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const config = require('./config');
const app = express();

app.set('port', (process.env.PORT || 9000));

mongoose.connect(config.dbUri);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve static files from /public folder
// LOCAL
// app.use(express.static(__dirname + '/client/public'));
// DEPLOYED
app.use(express.static(__dirname + '/client/build'));
app.use(favicon(__dirname + '/client/public/favicon.ico'));

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

//open api for auth (login, register) to avoid getting declined by auth protection.
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
//secured routes that will need a token.
app.use('/api', apiRoutes);
app.use('/*/api', apiRoutes);

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;