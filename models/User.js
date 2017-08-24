const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.authenticate = (name, password, callback) => {
    User.findOne({ name: name})
        .exec((error, user) => {
            if (error) {
                return callback(error);
            } else if (!user) {
                console.log("Userschema 23 - WRONG");
                return callback(error);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === false) {
                    return callback(null, user);
                } else {
                    // var err = new Error('User not found.');
                    // err.status = 401;
                    console.log(result);
                    return callback(null, user);
                }
            });
        });
};

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        next();
    });
});

let User = mongoose.model('User', UserSchema);
module.exports = User;