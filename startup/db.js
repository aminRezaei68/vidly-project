const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db,{useMongoClient:true})
        .then(() => {winston.info(`Connecting to the ${db}...`)});
}