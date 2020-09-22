import 'dotenv/config';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { initialState } from './initialState';
import reducers from '../reducers';
import apiMiddleware from '../../middlewares/apiMiddleware';

const middlewares = [thunk, apiMiddleware]; //Added API middleware to be applied in every API call

/**
 * A function that creates the project's redux store & state management
 * @param {Function} combineReducer - function that combines all project's reducers
 * @param {Object} initialState - object holding all project's initialStates
 * @author Samuel Rutakayile
 * @since 06.05.2020
 */
export default createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
