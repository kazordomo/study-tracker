const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
app.use(express.static(__dirname + '/public'));

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

//because we are checking for token every time we request /api, we use login/register from auth.
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
//secured routes that will need a token.
app.use('/api', apiRoutes);

//TODO: some kind of error handling? maybe we should keep it on the client side.

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;