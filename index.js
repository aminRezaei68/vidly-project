
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

mongoose.connect('mongodb://127.0.0.1/vidly',{useMongoClient:true})
    .then(() => {console.log('Connecting to the mongoDB.')})
    .catch(err => {console.error('Can not Connecting to the mongoDB...', err)}); 

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));