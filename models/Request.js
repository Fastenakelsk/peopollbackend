const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Request', RequestSchema);