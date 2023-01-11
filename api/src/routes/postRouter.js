const express = require('express');
const postVideogame = require('../controllers/postVideogame');

const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
    try {
        const game = await postVideogame(req.body)
        res.status(200).json(req.body)
    } catch (error) {
       res.status(400).send({'error.message ': error}) 
    }
});

module.exports = postRouter;