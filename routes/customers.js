const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {// get all customers
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
        // return res.status(400).send(error.details);
    }

    const customer = new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    }, { new: true
    })

    if (!customer) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(customer);
});

module.exports = router;