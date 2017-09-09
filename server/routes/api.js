const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');

// router.get('/', (req, res, next) => {
//     return res.json(req.session);
// });

//TODO: create an proper api. Subject.find should only be used once, for instance.
//TODO: remove all tha next parameters that's not being used, pl0x.

// /GET test
router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Authorized!!'
    });
});

// /GET subjects
router.get('/subjects', (req, res) => {
    Subject.find({}, (error, doc) => {
        res.json({doc});
    });
});

// /ADD subject
router.post('/addsubject', (req, res) => {
    if(req.body.title && req.body.hoursTodo) {
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
                //res.json?
                return res.send(subject);
            }
        });
    }
});

// /DELETE subject
router.delete('/deletesubject', (req, res) => {
   Subject.deleteOne({_id: req.body._id}, (error, result) => {
       //cleaning up: no else needed, it will end directly if error occurs
       if(error) {
           return res.send(500, error);
       } else {
           return res.status(200).end();
       }
   });
});

// /GET profile
router.get('/profile', (req, res) => {
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

// /POST commit
router.post('/addcommit', (req, res) => {
    if(req.body.message && req.body.time) {

        let commitData = {
            _id: req.body._id,
            message: req.body.message,
            time: req.body.time
        };

        console.log(commitData);
        //UPDATE
        Subject.findById(req.body.subjectId, (error, subject) => {
            subject.hoursDone += parseInt(commitData.time, 10);
            subject.commitMessages.push(commitData);
            subject.save((error) => {
                if(error) {
                    console.log("save error");
                    return res.status(400).end();
                }
                else {
                    res.send(subject);
                }
            });
        });
    }
});

// /DELETE commit
router.delete('/deletecommit', (req, res) => {
    Subject.findById(req.body.subject._id, (error, subject) => {
        let commit = subject.commitMessages.filter(message => message._id === req.body.message._id);
        //wtf
        subject.hoursDone -= parseInt(commit[0].time, 10);
        subject.commitMessages.splice(subject.commitMessages.indexOf(commit), 1);
        subject.save((error) => {
            if(error) {
                console.log("save error");
                return res.status(400).end();
            }
            else {
                res.send(subject);
            }
        });
    });
});

module.exports = router;
