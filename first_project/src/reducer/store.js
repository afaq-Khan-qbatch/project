import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import item_Reducer from './data';
import cart_reducer from './cartReducer'
import update_reducer from './updateQtyReducer'

export default configureStore ({
    reducer:{
        items_reducer : item_Reducer,
        cart_Reducer : cart_reducer,
        update_Reducer : update_reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})