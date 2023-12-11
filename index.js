require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

// process.on('uncaughtException', (exception) => { //instade of this we can use: handleExceptions()
//     winston.error(exception.message, exception);
//     process.exit(1);
// });

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (exception) => {
    // winston.error(exception.message, exception);
    // process.exit(1); // instade of these to line we can use : throw exexception.
    throw exception;
});

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'error'
});

if (!config.get('jwtPrivateKey')) {
    console.error('FATA ERROR: jwtPrivateKey is not define.');
    process.exit(1)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));