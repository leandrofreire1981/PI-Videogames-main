const axios = require('axios');
const getVideogameDb = require('./getVideogamesDb');
require('dotenv').config();
const { apiKey } = process.env;


const getVideogames = async (ban = 'games') => {
    let games = [];
    let videogames = [];

    //api local
    //games = await axios.get('http://localhost:3003/games')
    //games = [...games.data.results]  
   
    //api videogames
    //Con promesas
     games = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${1}`),
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${2}`),
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${3}`),
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${4}`),
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${5}`)
    ]); 
    games = games.map(res => res.data.results).flat()   


  
    if(ban==='platforms'){
        return games
    }
    else {
        games.map(game => {
            videogames.push({
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres.map(genres => genres.name),
                rating: game.rating,
                created: false
            })
        })   
    }

    let vgDB = await getVideogameDb();

    videogames =  [...vgDB, ...videogames]
    return videogames;
}

module.exports =  getVideogames;



