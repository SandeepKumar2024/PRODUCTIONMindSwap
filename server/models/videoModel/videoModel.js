const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Video', videoSchema);