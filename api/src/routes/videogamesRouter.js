const express = require('express');
const getVideogameById = require('../controllers/getVideogameById');
const getVideogames = require('../controllers/getVideogames');
const getVideogameByName = require('../controllers/getVideogamesByName');
const getVideogameDb = require('../controllers/getVideogamesDb');

const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res) => {
    const { name } = req.query;
    let videogames = null
    try{
        if(name){
            videogames = await getVideogameByName(name);
        }
        else{
            videogames = await getVideogames();
        }
        res.status(200).json(videogames)
    }catch(error) {
        res.status(404).send({'error de carga. ': error})
    }
});

videogamesRouter.get('/db', async (req, res) => {
    try {
        let videogamesDb = await getVideogameDb(); 
        res.status(200).json(videogamesDb)
    } catch (error) {
        res.status(400).send({'error de carga: ': error})
    }
});

videogamesRouter.get('/:idVideogames', async (req, res) => {
    const id = req.params.idVideogames;
    try{
        const videogame = await getVideogameById(id);
        res.status(200).json(videogame)
    }catch(error){
        res.status(404).send({'error de carga: ': error})
    }
});

module.exports = videogamesRouter;