const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 30
    },
    hoursDone: Number,
    //either hoursTodo or infinity should be required.
    hoursTodo: Number,
    infinity: Boolean,
    description: {
        type: String,
        maxlength: 250
    },
    inFocus: Boolean,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    commitMessages: Array,
    userId: String
});

let Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;