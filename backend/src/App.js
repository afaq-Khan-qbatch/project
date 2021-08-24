const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require ('./db/conn');
require('dotenv').config();
const item = require('./model/item');
const cart = require('./model/cart');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req , res) =>{
    res.send('ok');
})

app.get('/get_items', async(req , res) =>{
    const item_data = await item.find();
  //  console.log({item_data})
    res.send(item_data);
})

app.post('/save_to_cart' , async(req , res) =>{
    const { itemId } = req.body;
    const item_id = new mongoose.mongo.ObjectId(itemId);
    let cartItem = await cart.findOne({item_id});
    if(!cartItem)
    {
        cartItem = await cart.create({
            item_id,
            quantity: 1
        });
    } else {
        cartItem = await cart.update({item_id}, {quantity: cartItem.quantity + 1});
        cartItem = await cart.findOne({item_id});
    }
    res.send(
        cartItem
    );
})

app.post('/updateQty' , async(req , res) =>{
    const {_id} = req.body;
    const {quantity} = req.body;
    let cartItem = await cart.findById({_id});
    
    if(!cartItem){
        res.send("item not fount")
    }else{
        await cart.update({_id}, {quantity: quantity});
        cartItem = await cart.findById({_id});
        res.send(cartItem);
    }
    
})


app.get('/get_cart', async(req , res) =>{
    const cart_data = await cart.find();
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

app.post('/get_price' , async(req , res) =>{
    const Id = req.body.items_Id;

    let cartItem = await item.findById({ _id: Id });
   
    res.send(
       cartItem
    );
})

app.delete('/delete_cart' , async(req , res)=>{
    const Id = req.body.items_Id;
    console.log(Id)
        const del = await cart.findByIdAndDelete({_id : Id})
    res.send(del);
})

app.get('/add' , (req , res) =>{
    // const new_item = new item({
    //     name: 'cheez',
    //     price: 150
    // })
    // new_item.save().then(()=>{
    //     res.status(201).send(new_item)
    // }).catch((e)=>{
    //     res.status(400).send
    // })

})



app.listen(port , ()=>{
    console.log(`connection is running on port ${port}`)
})