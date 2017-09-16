const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hoursDone: Number,
    //either hoursTodo or infinity should be required.
    hoursTodo: Number,
    infinity: Boolean,
    description: String,
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