import { combineReducers } from "redux";
import weatherRedusers from "./weather/reducers"
import AuthReducers from "./register/reducers"

export default combineReducers({
  weatherRedusers,
  AuthReducers
});
