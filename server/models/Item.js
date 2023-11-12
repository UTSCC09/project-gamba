const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    weaponName:{
        type: String,
    },
    skinName:{
        type: String,
    },
    quality:{
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