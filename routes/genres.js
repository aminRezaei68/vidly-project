// const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {// get all genres
    // throw new Error('could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
    
router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('invalid ID.');
    }
    
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
        // return res.status(400).send(error.details);
    }

    const genre = new Genre ({ name: req.body.name });
    await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })

    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    res.send(genre);
});


module.exports = router;