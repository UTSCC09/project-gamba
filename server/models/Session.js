const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: String, // Session ID
    session: Object, // Session data
    expires: Date, // Session expiration date
});

module.exports = mongoose.model('Session', sessionSchema);