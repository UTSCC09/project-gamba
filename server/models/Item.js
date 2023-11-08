const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item_name:{
        type: String,
    },
    price:{
        type: Number,
    },
    quantity:{
        type: Number,
    },
});

module.exports = mongoose.model('Item', ItemSchema);