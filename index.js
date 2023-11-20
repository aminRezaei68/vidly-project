
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => {console.log('Connecting to the mongoDB.')})
    .catch(err => {console.error('Can not Connecting to the mongoDB...', err)}); 

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));