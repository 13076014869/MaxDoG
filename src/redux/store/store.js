import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';

const nextReducer = require('../reducer');
let store;
export default function configure(initialState) {
  // console.log('initialState', initialState)

  if (store !== null && store !== undefined) {
    return store;
  }
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(createStore)

  store = createStoreWithMiddleware(rootReducer, initialState)

  // console.log(store.getState())
  return store
}