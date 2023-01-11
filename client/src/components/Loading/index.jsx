import loading from '../../img/loading-1.gif'
import style from '../styles/Loading.module.css'

export default function Loading(){
    return (
        <div className={style.loading}>
            
            <img src={loading} alt='no found' />
            
        </div>
    )
}