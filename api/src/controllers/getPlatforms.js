const  getVideogames  = require("./getVideogames");
const { Platform } = require('../db')

const getPlatforms = async () => {

    let pfDb = await Platform.findAll();

    if(pfDb.length > 0){
        return pfDb.map(res => res.name)
    }

    let platforms =  await getVideogames('platforms')
    let pf = platforms.map(res => res.platforms.map(res => res.platform.name))
    pf = pf.flat()
    let pfFinal = new Set(pf)

    let aux = [...pfFinal]

    Promise.all(aux.map(res => Platform.create({'name': res})))
    
    return aux

}

module.exports = getPlatforms;