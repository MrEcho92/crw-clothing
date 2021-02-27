import { createStore } from 'redux';
import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createStore(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createStore(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
        0
      )
)