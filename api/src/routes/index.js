const { Router } = require('express');
const getGenres = require('../controllers/getGenres')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');
const postRouter = require('./postRouter');
const deleteRouter = require('./deleteRouter');
const { route } = require('./videogamesRouter');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter)

router.use('/genres', genresRouter)

router.use('/platforms', platformsRouter)

router.use('/post', postRouter)

router.use('/delete', deleteRouter)

module.exports = router;
