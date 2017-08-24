const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');

// /GET subjects

router.get('/subjects', (req, res, next) => {
    Subject.find({}, (error, doc) => {
        res.json({doc});
    });
});

router.post('/login', (req, res, next) => {

    if(req.body.name && req.body.password) {
        //SOMETHING FAKKED UP
        User.authenticate(req.body.name, req.body.password, (error, user) => {
            console.log(user);
            console.log(error);
            if(error || !user) {
                // let err = new Error('Wrong email or password');
                // err.status = 401;
                // return next(err);
                console.log("/login 25 - auth failed");
                return res.status(401).end();
            } else {
                //give user a session. _id is the id mongo gave the user collection when created
                // req.session.userId = user._id;
                return res.status(200).end();
            }
        });
    } else {
        // let err = new Error('Email and password are required');
        //401 - unauthorized
        // err.status = 401;
        // return next(err);
        console.log("name or password wrong");
        return res.status(401).end();
    }
});

router.post('/register', (req, res, next) => {
    if(req.body.name && req.body.email && req.body.password && req.body.reenterPassword) {
        if (req.body.password !== req.body.reenterPassword) {
            // let err = new Error('Passwords do not match');
            // err.status = 400;
            // return next(err);
            console.log("the two passwords need to match");
        }

        let userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        User.create(userData, (error, user) => {
            console.log(user);
            if(error) {
                console.log(error);
                return res.status(400).end();
            } else {
                return res.status(200).end();
            }
        });
    } else {
        // //TODO. create proper error-handling.
        return res.status(400).json({
            success: false,
            message: 'wrong'
        });
    }
});


module.exports = router;