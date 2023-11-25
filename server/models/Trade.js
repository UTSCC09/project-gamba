const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    sender:{
        type: String,
    },
    offer: {
        type: Array,
    },
    receive: {
        type: Array,
    },
});

module.exports = mongoose.model('Trade', TradeSchema);