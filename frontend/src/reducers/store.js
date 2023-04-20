import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);
// dispatch the addToCart action with some sample data
store.dispatch({
    type: 'ADD_TO_CART',
    payload: {
        id: 1,
        name: 'Sample Item',
        description: 'This is a sample item.',
        price: 9.99
    },
});

export default store;
