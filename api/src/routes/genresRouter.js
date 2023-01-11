const express = require('express');
const getGenres = require('../controllers/getGenres')


const genresRouter = express.Router();

genresRouter.get('/', async (req, res) => {
    try {
        const genres = await getGenres()
        res.status(200).json(genres)
    } catch (error) {
        res.status(404).send({'error de carga. ': error})
    }
});



module.exports = genresRouter;