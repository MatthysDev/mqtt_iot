// models/message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    topic: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
    attempts: { type: Number, default: 0 }
});

module.exports = mongoose.model('Message', messageSchema);
