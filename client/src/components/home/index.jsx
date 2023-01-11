import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../redux/actions';
import OrderVideogames from '../OrderVideogames';
import SearchBar from '../SearchBar';
import RenderPages from '../renderPages'
import style from '../styles/Home.module.css'
import { GET_VIDEOGAMES } from '../../redux/const';



export default function Home(){
    const dispatch = useDispatch();
    
    const videogames = useSelector(state => state.videogames)
    const findGames = useSelector(state => state.findGames)
    
    
    useEffect(() => {
        dispatch(getVideogames())
        return () => dispatch({
                        type: GET_VIDEOGAMES,
                        payload: []
                    })
    }, [dispatch])


    return (
        <div className={style.Home}>
            <div>
                {findGames.length? <SearchBar videogames={findGames} /> :<SearchBar videogames={videogames} />}
            </div>
            <div className={style.OrdeComponent}>
                {findGames.length? <OrderVideogames videogames={findGames} ban='findGames' /> : <OrderVideogames videogames={videogames} ban='fvideogames'/>}
            </div>
            <div>
                {findGames.length? <RenderPages videogames={findGames} ban='findGames'/> : <RenderPages videogames={videogames} ban='fvideogames'/>}
            </div>
        </div>
    )
}