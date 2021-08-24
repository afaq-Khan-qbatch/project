const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID

const schema = mongoose.Schema({
    item_id:{
        type: ObjectId
    },
    
    quantity:{
        type: Number
    }
})

const cart = new mongoose.model('cart' , schema);

module.exports = cart;