const mongoose = require('mongoose');
const Joi = require('joi');


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

const validateCustomer = customer => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(5).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;