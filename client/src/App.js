import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.css';
import CreateVideogame from './components/createVideogame';
import GameDetail from './components/gameDetail';
import Home from './components/home';
import LandingPage from './components/landingPage';
import Nav from './components/nav';
import VideogameRemoved from './components/VideogameRemoved';
import { getGenres, getPlatforms } from './redux/actions';


function App() {

  const dispatch = useDispatch()

  dispatch(getGenres())
  dispatch(getPlatforms())

  return (
    <div className="App">
  
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/home'>
          
          <Nav/>
          <Home/> 
        </Route>
        <Route exact path='/videogames/:id'>
          <Nav />
          <GameDetail />
        </Route>
        <Route exact path='/createGame'>
          <Nav />
          <CreateVideogame />
        </Route>
        <Route exact path='/juegoBorrado' >
          <Nav />
          <VideogameRemoved />
        </Route>
    </div>
  );
}

export default App;
