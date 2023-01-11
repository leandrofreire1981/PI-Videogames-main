const { Genre, Platform, Videogame } = require('../db')

const postVideogame = async (game) => {
    const { name, description, rating, released, genres, platforms } = game
    if(!name || !description || platforms.length === 0)
        throw Error('Faltan parametros')  

       let genresVideogames = await Genre.findAll({
        where: {name: genres}
    }) 

     let platformsVideogames = await Platform.findAll({
        where: {name: platforms}
    })  

        let newVideogame = await Videogame.create({
            name,
            description,
            rating,
            released
        })   

    newVideogame.addGenre(genresVideogames)
    newVideogame.addPlatform(platformsVideogames)

    return newVideogame
}

module.exports = postVideogame;