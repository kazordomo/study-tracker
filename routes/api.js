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


module.exports = router;