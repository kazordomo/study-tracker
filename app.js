const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.set('port', (process.env.PORT || 9000));

mongoose.connect('mongodb://root:root@ds145303.mlab.com:45303/study-tracker-db');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

app.use(session({
    secret: 'newsecretfrombeyond',
    resave: true,
    //should we save or not?
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use((req, res, next) => {
    // store the userId. all the views can access the currentUser.
    res.locals.currentUser = req.session.userId;
    next();
});

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from /public folder
app.use(express.static(__dirname + '/public'));

// view engine setup
// app.set('view engine', 'pug');
// app.set('views', __dirname + '/views');

const api = require('./routes/api');
app.use('/api', api);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     let err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
// });
//
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;