const router = require('express').Router();
require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

router.post('/signup', async (req, res) => {

    const { email, password, firstname, lastname } = req.body;

    const isUserExist = await user.findOne({ email: email });

    if (isUserExist) {
        res.status(200).send('User of this email already exist');
    } else {
        const hashedPasswoed = await bcrypt.hash(password, 10);
        const token = jwt.sign({
            email
        }, "hjgkgjhlklkj;ljghdhg", {
            expiresIn: 360000
        })

        try {
            const new_user = await user.create({
                email,
                password: hashedPasswoed,
                firstname,
                lastname
            });
            res.status(201).send(token);
        } catch (e) {
            res.status(400).send(e);
        }
    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const loginuser = await user.find({ email });
    console.log(loginuser);
    if (!loginuser) {
        console.log('error');
        return res.status(400).json({
            error: [
                {
                    msg: "Invalid Email Or Password!"
                }
            ]
        })
    }

    const hashedPasswoed = await user.findOne({ email }, { password: 1, _id: false });
    const isMatch = bcrypt.compare(hashedPasswoed, password);

    if (!isMatch) {
        console.log('error pas');
        return res.status(400).json({
            error: [
                {
                    msg: "Invalid Email Or Password!"
                }
            ]
        })
    }

    const token = jwt.sign({
        email
    }, "hjgkgjhlklkj;ljghdhg", {
        expiresIn: 360000
    })

    res.send(token);
})

router.get('/getUsers', async (req, res) => {
    const allUsers = await user.find();
    res.send(allUsers);
})


module.exports = router;