const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pollItems: [{
        text: String,
        votes: Number
    }],
    creator: {
        type: String,
        required: true
    },
    invitedUsers: {
        type: Array,
        required: true
    },
    votedUsers: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Poll', PollSchema);