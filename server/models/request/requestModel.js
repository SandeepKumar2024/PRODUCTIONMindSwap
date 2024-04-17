const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },



})

module.exports = mongoose.model('Request', requestSchema);