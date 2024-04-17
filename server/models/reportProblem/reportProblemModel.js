const mongoose = require('mongoose')


const reportProblem = new mongoose.Schema({
  
    userId: {
        type: String,
        default: null
    },
   
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('ReportProblem', reportProblem)