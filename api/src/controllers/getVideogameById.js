const axios = require('axios');
const getVideogameDb = require('./getVideogamesDb');
require('dotenv').config();
const { apiKey } = process.env;



const getVideogameById = async (id) => {
    let game
    let videogame
    if(id.length < 30){
        //api videogames
        game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)

        //api local
        //const game = await axios.get(`http://localhost:3003/games/${id}`)
        videogame = {
            id: game.data.id,
            name: game.data.name,
            description: game.data.description,
            image: game.data.background_image,
            released: game.data.released,
            rating: game.data.rating,
            platforms: game.data.platforms.map(res => res.platform.name),
            genres: game.data.genres.map(res => res.name),
            created: false
        } 
    }
    else {
        let aux = await getVideogameDb(id)
        videogame = aux[0]

    }
    return videogame

}

module.exports = getVideogameById;