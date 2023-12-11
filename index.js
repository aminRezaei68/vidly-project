require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
const users = require('./routes/users');

process.on('uncaughtException', (exception) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(exception.message, exception);
});

process.on('unhandledRejection', (exception) => {
    console.log('WE GOT AN UNHANDLED REJECTION');
    winston.error(exception.message, exception);
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

mongoose.connect('mongodb://127.0.0.1/vidly',{useMongoClient:true})
    .then(() => {console.log('Connecting to the mongoDB.')})
    .catch(err => {console.error('Can not Connecting to the mongoDB...', err)}); 

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));