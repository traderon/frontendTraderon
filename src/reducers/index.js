import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tradeReducer from "./tradeReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  trades: tradeReducer,
});
