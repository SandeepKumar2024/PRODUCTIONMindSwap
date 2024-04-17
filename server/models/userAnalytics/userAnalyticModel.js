const mongoose = require('mongoose')


const userAnalyticsSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: null
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    }
   



}, { timestamps: true });


module.exports = mongoose.model('UserAnalytics', userAnalyticsSchema)