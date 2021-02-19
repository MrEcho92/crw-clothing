import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

// Root Reducer
export default combineReducers({
  user: userReducer,
});
