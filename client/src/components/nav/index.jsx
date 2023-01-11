import { NavLink } from 'react-router-dom'
import style from '../styles/Nav.module.css'

export default function Nav(){

    return (
        <div className={style.Nav}>
            <NavLink to='/' className={style.Link}>
                Inicio
            </NavLink>
            <NavLink to='/home' className={style.Link}>
                Home
            </NavLink>
            <NavLink to='/createGame' className={style.Link}>
                Crear juego
            </NavLink>
        </div>
    )

}