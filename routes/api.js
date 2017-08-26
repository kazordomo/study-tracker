const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');

// router.get('/', (req, res, next) => {
//     return res.json(req.session);
// });

//TODO: create an proper api. Subject.find should only be used once, for instance.

// /GET subjects
router.get('/subjects', (req, res, next) => {
    Subject.find({}, (error, doc) => {
        res.json({doc});
    });
});

// /ADD subject
router.post('/addsubject', (req, res, next) => {
    if(req.body.title && req.body.hoursTodo) {
        console.log("title and hoursTodo ok");
        let subjectData = {
            title: req.body.title,
            hoursDone: 0,
            hoursTodo: req.body.hoursTodo,
            description: req.body.description ? req.body.description : '',
            inFocus: req.body.inFocus,
            commitMessages: []
        };
        Subject.create(subjectData, (error, subject) => {
            if(error) {
                console.log("ERROR");
                return res.status(400).end();
            } else {
                console.log(subject);
                return res.status(200).end();
            }
        });
    }
});

// /DELETE subject
//TODO: write the delete function. ERROR
router.delete('/deletesubject', (req, res) => {
    console.log(req.body);
   Subject.deleteOne({_id: req.body._id}, (error, result) => {
       //cleaning up: no else needed, it will end directly if error occurs
       if(error) {
           return res.send(500, error);
       } else {
           return res.status(200).end();
       }
   });
});

// /POST login
router.post('/login', (req, res, next) => {

    console.log(req.session);
    if(req.body.name && req.body.password) {
        User.authenticate(req.body.name, req.body.password, (error, user) => {
            console.log(user);
            if(error || !user) {
                // let err = new Error('Wrong email or password');
                // err.status = 401;
                // return next(err);
                console.log("/login 25 - auth failed");
                return res.status(401).end();
            } else {
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

// /POST register
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

// /GET profile
router.get('/profile', (req, res, next) => {
    //TODO: make it account-wise
    Subject.find({}, (error, doc) => {
        //TODO: test when we get commitMessages to db.
        //TODO: loading slowly. store in db or get when in overview?
        let totalSubjects = doc.length;
        let totalCommits = 0;
        let totalHours = 0;
        let doneSubjects = 0;
        //plz less forEach plzz
        doc.forEach((subject) => {
            totalCommits += subject.commitMessages.length;
            if(subject.hoursDone >= subject.hoursTodo) doneSubjects++;
            subject.commitMessages.forEach((commitMessage) => {
                totalHours += commitMessage.time;
            });
        });
        let profileData = {
            totalSubjects: totalSubjects,
            totalCommits: totalCommits,
            totalHours: totalHours,
            doneSubjects: doneSubjects
        };
        res.send(profileData);
    });
});


module.exports = router;