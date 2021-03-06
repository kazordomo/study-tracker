const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
const config = require('../../config');
const router = express.Router();

// /POST login
router.post('/login', (req, res) => {

    if(req.body.name && req.body.password) {
        User.authenticate(req.body.name, req.body.password, (error, user) => {
            if(error || !user) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to login.'
                });
            } else {
                const payload = {
                    sub: user._id
                };
                //create token string
                const token = jwt.sign(payload, config.jwtSecret);
                const userId = user._id;
                return res.json({
                    success: true,
                    userId: userId,
                    token: token
                });
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Both name and password need to be entered.'
        });
    }
});

// /POST register
router.post('/register', (req, res) => {
    if(req.body.name && req.body.email && req.body.password && req.body.reenterPassword) {
        if (req.body.password !== req.body.reenterPassword) {
            return res.json({
                success: false,
                message: 'Passwords do not match.'
            })
        }

        let userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        User.create(userData, (error, user) => {
            if(error) {
                return res.status(400).end();
            } else {
                const payload = {
                    sub: user._id
                };
                //create token string
                const token = jwt.sign(payload, config.jwtSecret);
                const userId = user._id;
                return res.json({
                    success: true,
                    userId: userId,
                    token: token
                });
                // return res.status(200).end();
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Failed to register.'
        });
    }
});

module.exports = router;