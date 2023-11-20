const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        minlength:5,
        maxlength:5
    }
});

const Customer = mongoose.model('Customer', customerSchema);

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

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
        // return res.status(400).send(error.details);
    }

    let customer = new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
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

const validateCustomer = customer => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(5).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports = router;