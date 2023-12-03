const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 200,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024
    }
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
