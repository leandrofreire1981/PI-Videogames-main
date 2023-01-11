import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { postVideogame } from "../../redux/actions"
import style from '../styles/createVideogame.module.css'

export default function CreateVideogame(){
    
    const genres = useSelector(state => state.genres) 
    const platforms = useSelector(state => state.platforms)

    const errorRef = useRef(null);
   
    const [ input, setInput ] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        genres: new Set(),
        platforms: new Set(),
        created: true
    })

    function handleInput(e){
        let aux = []
        if(e.target.name === 'description' || e.target.name === 'name'){
            
            if(!/[a-zA-Z 0-9.,¡!¿?$]+/gi.test(e.target.value.charAt(e.target.value.length - 1)))
                errorRef.current.innerHTML = 'Solo se permiten letras y numeros'
            else    
                errorRef.current.innerHTML = ''
            e.target.value = e.target.value.match(/[a-zA-Z 0-9.,¡!¿?$]+/gi)
            aux = []
            aux.push(e.target.value)
            aux.flat()
            e.target.value=aux[0].slice(0,1000)
            if(e.target.name === 'name'){
                e.target.value=aux[0].slice(0,50)

            }
            setInput({...input, [e.target.name]: e.target.value})
            return;
        }

        if(e.target.name==='released'){
            let auxDate = new Date()
            let actualDate
            if(auxDate.getMonth() + 1 < 10)
                actualDate = auxDate.getFullYear() + '-0' + (auxDate.getMonth() + 1)
            else    
                actualDate = auxDate.getFullYear() + '-' + (auxDate.getMonth() + 1)

            if(auxDate.getDate() < 10)
                actualDate += '-0' + auxDate.getDate()
            else
                actualDate += '-' + auxDate.getDate()

            if(e.target.value > '1962-02-14' && e.target.value <= actualDate) {  
                setInput({...input, released: e.target.value})
                errorRef.current.innerHTML = ''
            }
            else{
                setInput({...input, released: ''})
                e.target.value = 'dd / mm / aaaa'
                errorRef.current.innerHTML = 'La fecha debe ser posterior a 14-02-1962 y no puede ser posterior a la fecha actual'
            }
            return;
        }

        if(e.target.name === 'rating'){
            if(e.target.value >= 0 && e.target.value <= 5)
                setInput({...input, rating: e.target.value})
            else    
                e.target.value = ''
            return;
        }
        
        if(genres.includes(e.target.value) || platforms.includes(e.target.value)){
            if(e.target.name==='platforms' || e.target.name==='genres'){
                if(input[e.target.name].has(e.target.value))
                    input[e.target.name].delete(e.target.value)
                else
                    input[e.target.name].add(e.target.value)
            setInput({...input})
        }}

        

    }

    function handleClear(){
        setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            genres: new Set(),
            platforms: new Set(),
            created: true
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!input.name || !input.description || [...input.platforms].length === 0){
            alert('Falta completar campos. Nombre, descripcion y plataformas son obligatorios')
            return
        }
       postVideogame({...input, genres: [...input.genres], platforms: [...input.platforms]})
       handleClear()
       
    }

    
    return (
        <div className={style.create}> 
            <h2> Crear Juego </h2>
            <form onSubmit={handleSubmit} >
                <div className={style.input}>

                
               
                    <label className={style.label}>Nombre:</label>
                    <input type='text' name='name' onChange={handleInput} value={input.name}/>
                
                
                    <label className={style.label} >Descripción</label>
                    <textarea type='text'  name='description' onChange={handleInput} value={input.description} />   
                
                
                    <label className={style.label} >Fecha de lanzamiento:</label>
                    <input type='date' min='1960-01-01' name='released' onChange={handleInput} value={input.released} />
            
                    <label className={style.label} >Rating: </label>
                    <input type='number' min='0' max='5' step='0.01' name='rating' onChange={handleInput} value={input.rating} />
                </div>
                    <label ref={errorRef} className={style.error}></label>
                <div>
                    <h2>Géneros: </h2>
                    <div className={style.genres}>

                    {genres.length && genres.map((gen, i) => (
                        <div key = {i} > {gen}
                            <input type='checkbox' name='genres' value={gen} onChange={handleInput} checked={input.genres.has(gen)} />
                        </div>
                    ))}
                    </div>
                </div>
                <div>

                        <h2>Plataformas: </h2>
                    <div className={style.genres}>
                        {platforms.length && platforms.map((res, i) => (
                            <div key = {i}>{res} 
                                <input type='checkbox' name='platforms' value={res} onChange={handleInput} checked={input.platforms.has(res)} />
                            </div>
                        ))} 
                    </div>
                </div>
                    <input type='reset' value='Limpiar' onClick={handleClear} className={style.button} />
                <input type='submit' className={style.button} />

            </form>

        </div>
    )
}