require('dotenv').config();
const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const cart = require('../model/cart');
const item = require('../model/item');
const checkAuth = require('../middleware/checkAuth');

router.post('/save_to_cart' ,checkAuth, async(req , res) =>{
    const { id } = req.body;
    const  userId  = req.user;
    //console.log(id ,"  " , userId);
    const item_id = new mongoose.mongo.ObjectId(id);
    let cartItem = await cart.findOne({item_id});
    //console.log(cartItem);
    let singleCart = await cart.findOne({item_id , userId});
    //console.log({singleCart});
    if(singleCart) {
        singleCart.quantity = singleCart.quantity + 1;
        await singleCart.save();
    } else {
        singleCart = await cart.create({
            item_id,
            quantity: 1,
            userId 
        })
    }

    res.send(
        singleCart
    );
})

router.post('/updateQty' , async(req , res) =>{
    const { _id , quantity} = req.body;
    //console.log("update qty " ,req.body);
    let cartItem = await cart.findById({_id});
    
    if(!cartItem){
        res.send("item not fount")
    }else{
        await cart.update({_id}, {quantity: quantity});
        cartItem = await cart.findById({_id});
        res.send(cartItem);
    }
    
})

router.post('/get_cart',checkAuth , async(req , res) =>{
    const user = req.user;
    const cart_data = await cart.find({userId: user});
    //console.log("cart " , cart_data[0]);
    const full_cart = await Promise.all(cart_data.map(async(element) =>{
        const name = await item.find({_id : element.item_id} , {name : 1, _id:false })
        const price = await item.find({_id : element.item_id} ,{price : 1, _id:false})
        return obj = { 
           "_id": element._id,
            "name" : name[0].name,
            "price" : price[0].price,
            "quantity": element.quantity
           }

    }))
    res.send(full_cart);
})

router.delete('/delete_cart' , async(req , res)=>{
    const Id = req.body.items_Id;
    //console.log(Id)
        const del = await cart.findByIdAndDelete({_id : Id})
    res.send(del);
})

module.exports = router;