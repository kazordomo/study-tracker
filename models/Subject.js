const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hoursDone: Number,
    hoursTodo: {
        type: Number,
        required: true
    },
    commitMessages: Array,
});

let Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;