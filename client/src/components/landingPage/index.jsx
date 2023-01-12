import { Link } from 'react-router-dom'
import style from '../styles/LandingPage.module.css'
import video from '../../img/imagen1.jpg'

export default function LandingPage(){
    return(
        <div className={style.landing}>
                <img className={style.video} src={video} alt='not found'/>   
            <Link to='/home'>
                <button className={style.button} >Entrar</button>
            </Link>
        </div>
    )
}