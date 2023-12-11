const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://127.0.0.1/vidly',{useMongoClient:true})
        .then(() => {winston.info('Connecting to the mongoDB.')});
}