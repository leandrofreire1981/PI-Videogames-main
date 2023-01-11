const express = require('express');
const getPlatforms = require('../controllers/getPlatforms');

const platformsRouter = express.Router();

platformsRouter.get('/', async (req, res) => {
    try {
        const platforms = await getPlatforms();
        res.status(200).json(platforms)
    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = platformsRouter;