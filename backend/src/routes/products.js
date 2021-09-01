require('dotenv').config();
const router = require('express').Router();
require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const cart = require('../model/cart');
const item = require('../model/item');
const checkAuth = require('../middleware/checkAuth');

router.get('/get_items', async(req , res) =>{
    const item_data = await item.find();
  //  console.log({item_data})
    res.send(item_data);
})

router.post('/add' , async(req , res) =>{
    const new_item = new item(req.body)
    new_item.save().then(()=>{
        res.status(201).send(new_item)
    }).catch((e)=>{
        res.status(400).send
    })

})

router.get('/getDescription/:id' , async(req , res) => {
    const {id} = req.params;
    const desItem = await item.findById(id);
    if(desItem){
        res.send(desItem);
    }
    else{
        res.send('id not found');
    }
})

module.exports = router;