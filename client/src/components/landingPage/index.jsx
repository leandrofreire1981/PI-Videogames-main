import { Link } from 'react-router-dom'
import style from '../styles/LandingPage.module.css'
import video from 'https://res.cloudinary.com/ddmdopmzf/video/upload/v1673449527/opening2_g37wmb.mp4'

export default function LandingPage(){
    return(
        <div className={style.landing}>
                <video className={style.video} src={video} autoPlay loop muted/>   
            <Link to='/home'>
                <button className={style.button} >Entrar</button>
            </Link>
        </div>
    )
}