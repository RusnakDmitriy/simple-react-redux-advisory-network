import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import api from '../middlewares/api';
import localStorage from '../middlewares/localStorage';
import thunk from 'redux-thunk';

const enhancer=applyMiddleware(thunk,logger,api,localStorage);

const store=createStore(reducer,{},enhancer);

export default store