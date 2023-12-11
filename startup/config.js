const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATA ERROR: jwtPrivateKey is not define.');
        process.exit(1)
    }    
}