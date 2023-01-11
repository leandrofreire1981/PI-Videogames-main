const { Videogame, Genre, Platform } = require('../db');

const deleteVideogame = async (idGame) => {
    console.log('id: ', idGame)
    let vg = await Videogame.findAll({
        where: {id: idGame},
        include: 
        [
            {model: Genre, 
                attribures: ['name']},
            {model: Platform,
                attributes: ['name']}
        ]
    })

    vg = await Videogame.destroy({
        where: {id: idGame}
    });

    return vg
};

module.exports = deleteVideogame;