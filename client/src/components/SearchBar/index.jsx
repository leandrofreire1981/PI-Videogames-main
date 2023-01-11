
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getVideogamesByName } from "../../redux/actions";
import { SEARCH } from "../../redux/const";
import style from '../styles/SearchBar.module.css'

export default function SearchBar(props){
    let videogames = props.videogames
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector(state => state.genres)

    function handleOnSelect(e){     
        let vg = []
        if(e.target.value!=='Cualquier Genero'){
            videogames.map(res => {
            if(res.genres.includes(e.target.value))
                vg.push(res)
                dispatch({
                    type: SEARCH,
                    payload: vg
                })
                return res;
            })
            if(vg.length===0){
                //alert('No se encontró el juego')
                dispatch({
                    type: SEARCH,
                    payload: [{id: -1,
                    name: 'Juego no encontrado',
                    image: '',
                    genres: [],
                    rating: -1,
                    created: true, }]
                    })
                e.target.value='Cualquier Genero'

            }

        }

            
            history.push('/home')
    }

    function handleOnSearch(e){
        e.preventDefault()
        let gamesFindedDb = []
        gamesFindedDb.push(videogames.filter(res => res.name.toLowerCase().includes(e.target[0].value.toLowerCase()) && res.created))

        dispatch(getVideogamesByName(e.target[0].value, gamesFindedDb[0]))
  
        e.target[0].value=''
        e.target[2].value='Cualquier Genero'
        history.push('/home')
    }

    function handleOnAllGames(){
        dispatch({
            type: SEARCH,
            payload: []
        })

        history.push('/home')
    }



    return(
        <div>
             <form onSubmit={handleOnSearch} className={style.Search}>
                <label className={style.letters} >Ingrese nombre del juego</label>
                <input type='search' />
                <input type='submit' value='Buscar' className={style.button} /> 

                <label className={style.letters} >Seleccione el genero</label>
                <select onChange={(e) => handleOnSelect(e)} className={style.select} >
                    <option value='Cualquier Genero'>Cualquier Genero</option>
                    {
                        genres.length && genres.map((gen, i) => (
                            <option key={i} value={gen}>{gen}</option>
                            ))
                    }

                </select>  
                <button onClick={handleOnAllGames} className={style.button} >Todos los Juegos</button> 
            </form> 
    
        </div>
    )
}