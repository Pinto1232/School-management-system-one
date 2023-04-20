// actions/CartActions.js
// Define action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

// Define action creators
export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

export const removeFromCart = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId,
});

export const updateCartQuantity = (itemId, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { itemId, quantity },
});
