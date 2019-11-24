const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Friend', FriendSchema);