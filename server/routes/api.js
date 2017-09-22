const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subject = require('../models/Subject');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// /GET subjects
router.get('/subjects', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        Subject.find({'userId': decoded.sub}, (error, doc) => {
            res.json({doc});
        });
    });
});

// /ADD subject
router.post('/addsubject', (req, res) => {
    if(req.body.title) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
           let subjectData = {
                title: req.body.title,
                hoursDone: 0,
                hoursTodo: req.body.hoursTodo ? req.body.hoursTodo : 0,
                infinity: req.body.infinity,
                description: req.body.description ? req.body.description : '',
                inFocus: req.body.inFocus,
                commitMessages: [],
                userId: decoded.sub
            };
            Subject.create(subjectData, (error, subject) => {
                if(error) {
                    return res.status(400).json({
                        success: false,
                        message: 'Error creating subject.'
                    });
                } else {
                    return res.send(subject);
                }
            });
        });
    }
});

router.post('/editsubject', (req, res) => {
    let updateSubject = req.body;
    Subject.findById(updateSubject._id, (error, subject) => {
        subject.update(updateSubject, (error, subject) => {
            if(error) {
                return res.status(400).end();
            }
            return res.json(subject);
        });
    });
});

// /DELETE subject
router.delete('/deletesubject', (req, res) => {
    Subject.deleteOne({_id: req.body._id}, (error, result) => {
        if(error) {
            return res.send(500, error);
        }
        return res.status(200).end();
    });
});

// /POST commit
router.post('/addcommit', (req, res) => {
    if(req.body.message && req.body.time) {

        let commitData = {
            _id: req.body._id,
            message: req.body.message,
            time: req.body.time,
            timestamp: req.body.timestamp
        };

        //UPDATE
        Subject.findById(req.body.subjectId, (error, subject) => {
            subject.hoursDone += parseInt(commitData.time, 10);
            subject.commitMessages.push(commitData);
            subject.lastUpdated = commitData.timestamp;
            subject.save((error) => {
                if(error) {
                    return res.status(400).end();
                } else {
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
        subject.hoursDone -= parseInt(commit[0].time, 10);
        subject.commitMessages.splice(subject.commitMessages.indexOf(commit[0]), 1);
        subject.save((error) => {
            if(error) {
                return res.status(400).end();
            }
            else {
                res.send(subject);
            }
        });
    });
});

module.exports = router;
