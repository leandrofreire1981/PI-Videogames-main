import { useDispatch } from "react-redux";
import { GET_VIDEOGAMES } from "../../redux/const";
import styleSearchBar from '../styles/SearchBar.module.css'
import style from '../styles/OrderVideogames.module.css'


export default function OrderVideogames(props){
    let { videogames } = props;

    const dispatch = useDispatch()

    function handleOrder(e){
        switch (e.target.name) {
            case 'AZ':
                videogames.sort((a, b) => a.name.localeCompare(b.name));
                break;
            
            case 'ZA':
                videogames.sort((a, b) => b.name.localeCompare(a.name));
                break;
            
            case 'mayorRating':
                videogames.sort((a, b) => b.rating - a.rating);
                break;

            case 'menorRating':
                videogames.sort((a, b) => a.rating - b.rating);
                break;

            default:
                break;
        }

        dispatch({
            type: GET_VIDEOGAMES,
            payload: videogames
        })

    }

    return (
        <div className={style.OrderVideogames}>
            <button name='ZA' onClick={handleOrder} className={styleSearchBar.button} >Z-A</button>
            <button name='AZ' onClick={handleOrder} className={styleSearchBar.button} >A-Z</button>
            <button name='mayorRating' onClick={handleOrder} className={styleSearchBar.button} >Mayor rating</button>
            <button name='menorRating' onClick={handleOrder} className={styleSearchBar.button} >Menor rating</button>
        </div>
    )
}