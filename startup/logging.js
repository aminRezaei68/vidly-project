const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = function () {
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
}