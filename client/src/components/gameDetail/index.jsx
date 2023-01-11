import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getVideogameById } from "../../redux/actions"
import { GET_VIDEOGAMES_BY_ID } from "../../redux/const"
import Loading from "../Loading"
import parser from 'html-react-parser'
import style from '../styles/GameDetail.module.css'


export default function GameDetail(){
    const { id } = useParams()
    
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getVideogameById(id))
        return () => dispatch({
            type: GET_VIDEOGAMES_BY_ID,
            payload: {}
        })
    }, [dispatch, id])
    
    let vg = useSelector(state => state.gameDetail)

    
    if(vg.image)
        return (
            <div className={style.GameDetail}>
                <h2>{vg.name}</h2>
                
                <div>
                    Lanzado: {vg.released}
                </div>
                <div>
                    Rating: {vg.rating}
                </div>
                <h2>
                    Plataformas
                </h2>
                <div>
                    {vg.platforms.map((res, i) => (
                        <p key = {i}>{res}</p>
                    ))}
                </div>
                <h2>
                    Genero
                </h2>
                <div>
                    {vg.genres.map((res, i) => (
                        <p key = {i}> {res} </p>
                    ))}
                </div>
                <h2>
                    Descripcion
                </h2>
                <div className={style.description}>
                   {parser(vg.description)} 
                </div>
                   <img src={vg.image} alt='not found'className={style.image} />
            </div>
        )
    
    return (
        <div>
            <Loading />
        </div>
    )

}