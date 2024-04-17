const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    peerId: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Room', roomSchema);