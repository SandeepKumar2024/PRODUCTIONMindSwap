const mongoose = require('mongoose')

const feedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    },
    currentPosition: {
        type: String,
        default: null
    },
    message: {
        type: String,
        required: true

    },
    isDisplay:{
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('FeedBack', feedBackSchema)