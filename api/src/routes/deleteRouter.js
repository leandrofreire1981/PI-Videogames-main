const express = require('express');
const deleteVideogame = require('../controllers/deleteVideogame');


const deleteRouter = express.Router();

deleteRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vg = await deleteVideogame(id);
        res.status(200).json(vg)
    } catch (error) {
        res.status(400).send({'error: ': error})
    }
 
});

module.exports = deleteRouter;
