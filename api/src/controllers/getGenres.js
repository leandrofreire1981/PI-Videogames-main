const axios = require('axios')
const { Genre } = require('../db')

require('dotenv').config();
const { apiKey } = process.env;


const getGenres = async () => {

     let genresDb = await Genre.findAll()
    if(genresDb.length > 0)
        return genresDb.map(res => res.name) 

    //api videogames
    const genres = await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
    console.log('genres: ', genres.data.results[0].name)
    let gen = genres.data.results.map(res => res.name)
    
    
    //apilocal
    //let gen = await axios.get('http://localhost:3003/genres')
    //gen = gen.data.map((res) => {return res.name})

   await Promise.all(gen.map(res => Genre.create({'name': res})))

    return gen


}

module.exports = getGenres;