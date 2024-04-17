const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    senderId: {
        type: String,

    },
    acceptId: {
        type: String,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    }
}, { timestamps: true })


module.exports = mongoose.model('History', historySchema)