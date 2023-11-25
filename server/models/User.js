const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    total_price: {
        type: Number,
    },
    inventory: {
        type: Array,
    },
    status: {
        type: Boolean,
    },
    friends: {
        type: Array,
    },
    trades: {
        type: Array,
    }
});

module.exports = mongoose.model('User', UserSchema);