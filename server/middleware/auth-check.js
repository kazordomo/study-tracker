const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../config');

module.exports = (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: 'No validation token found.'
        });
    }

    //auth token we are sending with our headers in get req
    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if(err) {
            return res.status(403).json({
                success: false,
                message: 'Token verification failed.'
            });
        }

        //decode the token data (user._id) to check if user exist
        const userId = decoded.sub;

        return User.findById(userId, (userErr, user) => {
            if(userErr || !user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            return next();
        })
    })
};

