const winston = require('winston');

module.exports = function(error, req, res, next) {
    // winston.log('error', error.message); // we can use error instead of log then -->
    // --> we have: winston.error(error.message);
    winston.error(error.message);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    res.status(500).send('Something failed.');
}