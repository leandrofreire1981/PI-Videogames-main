import { useHistory, useLocation } from "react-router-dom";
import Loading from "../Loading";
import Page from "../Page";
import style from '../styles/RenderPages.module.css'
import styleSearch from '../styles/SearchBar.module.css'



export default function RenderPages(props){
    const { videogames } = props
    let GAME_PAGE = 15
    
    const location = useLocation()
    const history = useHistory()
    
    let query = new URLSearchParams(location.search)
    let start = parseInt(query.get('inicio')) || 1;
    let end = parseInt(query.get('fin')) || GAME_PAGE;
    if (start < 0) history.push(`?inicio=1&fin=${GAME_PAGE}`);
    
 
    let renderVideogames = videogames.slice(start-1, end)
    
    let pageCount = Math.ceil(videogames.length / GAME_PAGE)
    let buttonsPages = []

    for(let i = 0; i < pageCount; i++){  
        buttonsPages.push({
           inicio: i * GAME_PAGE + 1,
            fin: i * GAME_PAGE + GAME_PAGE 
        })
    }
    
    function goPage(e){
        let page = (parseInt(query.get('inicio'))) || 0
        if(page>0)
            page = (page - 1) / GAME_PAGE
        let inicio = 0
        let final = 0
        switch (e.target.id) {
            case 'prev':
                inicio = buttonsPages[page - 1].inicio
                final = buttonsPages[page - 1].fin 
                break;

            case 'next':
               inicio = buttonsPages[page + 1].inicio
               final = buttonsPages[page + 1].fin  
                break;

            default:
                inicio = buttonsPages[e.target.id].inicio
                final = buttonsPages[e.target.id].fin 
                break;
        }
        if(final>videogames.length) final=videogames.length
        history.push({search: `?inicio=${inicio}&fin=${final}`})
    }

    
    return (
        <div className={style.RenderPages}>
            <div className={style.buttonsPages}>

                <h2 className={styleSearch.letters}> Pagina {Math.ceil(end / GAME_PAGE)}</h2> 
                {start >= GAME_PAGE && <button id='prev' onClick={goPage} className={styleSearch.button}> {'<'} </button>}

                {buttonsPages.length && buttonsPages.map((res, i) => (
                    <button key={i} onClick={goPage} id={i} className={styleSearch.button} >{i + 1}</button>
                    ))
                } 

                {end  < videogames.length && <button id='next' onClick={goPage} className={styleSearch.button}>{'>'}</button>}
            </div>
            <div className={style.Pages} >

                {renderVideogames.length? renderVideogames?.map((res, i) => (
                    
                    <Page key={i} id={res.id} name={res.name} image={res.image} genres={res.genres} rating={res.rating} created={res.created} />
                    
                    )): <Loading />} 
            </div>
        </div>
    )
}