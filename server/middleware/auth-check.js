const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../config');

module.exports = (req, res, next) => {

    //WORKS ON SERVER SIDE

    console.log(req.headers);

    if(!req.headers.authorization) {
        return res.status(403).end();
    }

    /*

        For now we use token as req.headers.authorization. This mean that for example in postman,
        we need to add a key-value pair with authorization as the name and the token value as the token.
        We could also add it as token: token in the body, and then fetch it as req.body.token.

     */
    // const token = req.headers.authorization.split(' ')[1];
    // const token = req.body.token || req.headers['token'];
    const token = req.headers.authorization;

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if(err)
            // return res.status(401).end();
            return res.status(401).json({
                message: 'Token verification failed'
            });

        //decode the token data (user._id) to check if user exist
        const userId = decoded.sub;

        return User.findById(userId, (userErr, user) => {
            console.log(userId);
            console.log(user);
            if(userErr || !user)
                // return res.status(401).end();
                return res.status(401).json({
                   message: 'User not found.'
                });

            return next();
        })
    })
};

