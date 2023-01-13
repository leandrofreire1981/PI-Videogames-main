import { Link } from 'react-router-dom'
import style from '../styles/LandingPage.module.css'
import letras from '../../img/imagen3.jpg'


export default function LandingPage(){
    return(
        <div className={style.landing}>
            <div className={style.text}>
                <a className={style.text3} href="https://www.linkedin.com/in/freireleandro/">https://www.linkedin.com/in/freireleandro/</a>
            </div>
                 <img className={style.video} src={letras} alt='not found'/>  
            <Link to='/home'>
                <button className={style.button} >Entrar</button>
            </Link>
        </div>
    )
}