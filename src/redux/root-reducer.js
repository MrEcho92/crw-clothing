import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from './cart/cart.reducer';

// Root Reducer
export default combineReducers({
  user: userReducer,
  cart: cartReducer
});
