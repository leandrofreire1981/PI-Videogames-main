import { GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID, SEARCH } from "../const"
import axios from 'axios'

export function getVideogames(){

    return async function(dispatch){

        //let videogames = await axios.get('http://localhost:3001/videogames')
        let videogames = await axios.get('https://pi-videogames-production-cad2.up.railway.app/videogames')
        videogames = [...videogames.data]
        dispatch({
            type: GET_VIDEOGAMES,
            payload: videogames
        })
    }
        
}

export function getGenres(){

    return function(dispatch){
        //fetch('http://localhost:3001/genres')
        fetch('https://pi-videogames-production-cad2.up.railway.app/genres')
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: GET_GENRES,
                    payload: res
                })
            })
            .catch(error => error)
    }
}

export function getVideogamesByName(name, gamesFindedDb){
    
    return function(dispatch){
        //fetch(`http://localhost:3001/videogames?name=${name}`)
        fetch(`https://pi-videogames-production-cad2.up.railway.app/videogames?name=${name}`)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: SEARCH,
                    payload: [...gamesFindedDb, ...res]
                })
            }
            ).catch(error => error)
    }
}

export function getVideogameById(id){

    return function(dispatch){
        //fetch(`http://localhost:3001/videogames/${id}`)
        fetch(`https://pi-videogames-production-cad2.up.railway.app/videogames/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log('actions: ', res)
                dispatch({
                    type: GET_VIDEOGAMES_BY_ID,
                    payload: res
                })
            })
            .catch(error => error)
    }
}

export function getPlatforms(){

    return function(dispatch){
        //fetch('http://localhost:3001/platforms')
        fetch('https://pi-videogames-production-cad2.up.railway.app/platforms')
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: GET_PLATFORMS,
                    payload: res
                })
            })
            .catch(error => error)
    }
}

export function postVideogame(game){

    //fetch(`http://localhost:3001/post`, {
    fetch(`https://pi-videogames-production-cad2.up.railway.app/post`, {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
            'Content-Type': 'application/json'
            }
    })
       .then(res => res.json())
        .catch(error =>error)
        .then(res => res)
        alert('Videogame creado con exito')

}

export function deleteVideogame(id, history){

    //fetch(`http://localhost:3001/delete/${id}`)
    fetch(`https://pi-videogames-production-cad2.up.railway.app/delete/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log('actions ', res)
            history.push('/juegoBorrado')
            return res
        }

            )
        .catch(error => error)
    
}
