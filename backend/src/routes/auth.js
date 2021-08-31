const router = require('express').Router();
require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const cart = require('../model/cart');

router.post('/signup', async (req, res) => {

    const { email, password, fname, lname } = req.body;
    const isUserExist = await user.findOne({ email: email });
    
    if (isUserExist) {
        res.status(200).send('User of this email already exist');
    } else {
        console.log(req.body);
        const hashedPasswoed = await bcrypt.hash(password, 10);
        console.log("hashedPasswoed", hashedPasswoed);
        const token = jwt.sign({
            email
        }, "hjgkgjhlklkj;ljghdhg", {
            expiresIn: 360000
        })
        console.log({token});
        try {
            const new_user = await user.create({
                email,
                password: hashedPasswoed,
                firstname: fname,
                lastname: lname
            });
            console.log({new_user});
            res.status(201).send(token);
        } catch (e) {

            res.status(400).send(e);
        }
    }

});

router.post('/login', async (req, res) => {
    try {
        const { email, password, Token } = req.body;
        const loginuser = await user.findOne({ email });
        console.log("loginuser", Token);
        if (!loginuser) {
            console.log('error');
            return res.status(400).json({
                error: [
                    {
                        msg: "Invalid EEmail Or Password!"
                    }
                ]
            })
        }

        const isMatch = await bcrypt.compare(password , loginuser.password);
        console.log({isMatch})
        if (!isMatch) {
            console.log('error pas');
            return res.status(400).json({
                error: [
                    {
                        msg: "Invalid Email Or Passwordd!"
                    }
                ]
            })
        }

        //Assign user at db
        //const login = await cart.find({ userId: Token });
        try{
            const updated = await cart.updateMany({ userId: Token },{ $set: {userId: email.toLowerCase()}})
        }catch(e){
            res.send(e);
        }
       // console.log(login);

        const token = jwt.sign({
            email
        }, "hjgkgjhlklkj;ljghdhg", {
            expiresIn: 360000
        })
    
        res.status(200).json({
            user: loginuser,
            token: token
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/getUsers', async (req, res) => {
    const allUsers = await user.find();
    res.send(allUsers);
})


module.exports = router;