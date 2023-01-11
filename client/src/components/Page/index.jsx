import { NavLink, useHistory } from "react-router-dom";
import { deleteVideogame } from "../../redux/actions";
import style from '../styles/Page.module.css'

export default function Page(props){

    const history = useHistory()

    function handleDelete(){
        deleteVideogame(props.id, history)
    }
    
    if(!props.image)
        return(
            <div className={style.notFound}>
                No se encontró ningun juego
            </div>
        )
    return (
       
            <NavLink to={`/videogames/${props.id}`} className={style.Page}>
                <div className={style.card}>
                    <div className={style.delete}>
                        {props.created && <button className={style.button} onClick={handleDelete}>x</button>}
                    </div>

                    <div>
                        
                        {props.name}

                    </div>

                    <div className={style.rating}>

                        {props.rating}
                    </div>
                    
                    <div className={style.genres}>

                     {props.genres.length && props.genres.map((genres, i) => (
                         <p key={i}>{genres}</p>
                         ))} 
                    

                    </div>
                   
                     <img src={props.image} alt='not found' className={style.image} /> 
                </div>
            </NavLink>
            
      
    )
}