import { combineReducers } from 'redux';
import shoppingCart from './shoppingCart/shoppingCartReducer';

export const Reducers = combineReducers({
    shoppingCart: shoppingCart
});