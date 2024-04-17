const mongoose = require('mongoose')


const reportSchema = new mongoose.Schema({
    reportId: {
        type: String,
        default: null

    },
    userId: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: null
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('ReportAbuse', reportSchema)