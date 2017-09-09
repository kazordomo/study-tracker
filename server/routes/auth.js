const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
const config = require('../../config');
const router = express.Router();

//TODO: res.status(...).json({}). Put proper statuses.

// /POST login
router.post('/login', (req, res) => {

    if(req.body.name && req.body.password) {
        User.authenticate(req.body.name, req.body.password, (error, user) => {
            console.log(user);
            if(error || !user) {
                console.log("/login - auth failed");
                return res.status(401).json({
                    success: false,
                    message: 'Failed to login.'
                });
            } else {
                //token data
                const payload = {
                    sub: user._id
                };
                //token string
                const token = jwt.sign(payload, config.jwtSecret);
                const data = {
                    name: user.name
                };
                return res.json({
                    success: true,
                    data: data,
                    token: token
                });
            }
        });
    } else {
        console.log("name or password wrong");
        return res.json({
            success: false,
            message: 'Auth failed.'
        })
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
            console.log(user);
            if(error) {
                console.log(error);
                return res.status(400).end();
            } else {
                return res.status(200).end();
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