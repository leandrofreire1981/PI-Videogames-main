const { Videogame, Genre, Platform } = require('../db')

const getVideogameDb = async (idGame = -1) => {
    let videogames = []
    if(idGame === -1){
        videogames = await Videogame.findAll({
            include: 
                
             [   
                {model: Genre,
                attributes: ['name']},
       
                {model: Platform,
                attributes: ['name']}
            ]
        })
    }
    else{
        videogames = await Videogame.findAll({
            where: {id: idGame},
            include: 

            [   
                {model: Genre,
                attributes: ['name']},
                    
                {model: Platform,
                attributes: ['name']}
            ]
        })
    }

        let VG = videogames.map(res => {
            return{
                id: res.id,
                name: res.name,
                description: res.description,
                released: res.released,
                rating: res.rating,
                created: res.created,
                image: 'https://media.wired.com/photos/62feb60bcea7c0581e825cb0/master/pass/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg',
                genres: res.Genres.map(res => res.name),
                platforms: res.Platforms.map(res => res.name)
            }
        })

        return VG

}

module.exports = getVideogameDb;