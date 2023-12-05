const jwt = require('jsonwebtoken');
const config = require('config');
const bycrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({email : req.body.email});
    if (user) {
        return res.status(400).send('User already registered.');
    } 

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // instead of 'user = new User({req.body})' at above we can use lodash:
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password, salt);

    await user.save();

    // res.send(user);
    // res.send({
    //     name: user.name,
    //     email: user.email
    // });
    // instead of use name: user.name & email: user.email we use line above:

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 