/* import rootReducer from "../reducer";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import  { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; */

import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducer/index";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;