const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: Number
    }
})

const Items = new mongoose.model('items' , schema);

module.exports = Items;