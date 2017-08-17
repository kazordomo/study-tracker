const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec((error, user) => {
            if (error) {
                return callback(error);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === false) {
                    return callback(null, user);
                } else {
                    console.log(result);
                    console.log('user.password: ' + user.password + ' \n', 'password: ' + password);
                    return callback();
                }
            });
        });
}

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

let User = mongoose.model('User', UserSchema);
module.exports = User;