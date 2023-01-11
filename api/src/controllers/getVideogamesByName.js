const axios = require('axios');
require('dotenv').config();
const { apiKey } = process.env;

const getVideogameByName = async (name) => {
    const videogames = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`);
    //const videogames = await axios.get('http://localhost:3003/simpsons');
    let vg = []


    videogames.data.results.map(res => {
        vg.push({
            id: res.id,
            name: res.name,
            image: res.background_image,
            rating: res.rating,
            genres: res.genres.map(res => res.name),
            created: false
        })
    })

    if(!vg.length)
        vg.push([{id: -1,
            name: 'Juego no encontrado',
            image: '',
            genres: [],
            rating: -1,
            created: true, }])  
    return vg;
}

module.exports = getVideogameByName;