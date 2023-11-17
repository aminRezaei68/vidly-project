const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'comedy'},
    {id: 2, name: 'action'},
    {id: 3, name: 'drama'},
    {id: 4, name: 'horror'}
];

const validateGenre = genre => {
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(genre, schema);
}

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
        // return res.status(400).send(error.details);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The ID that you enter is not exist.');
    }

    const index = genres.indexOf(genre);
    genres.splice(genre, 1);

    res.send(genre);
});


module.exports = router;