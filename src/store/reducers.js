import { combineReducers } from "redux";
import weatherRedusers from "./weather/reducers";
import AuthReducers from "./register/reducers";
import AutoReducers from "./auto/reducers";
import NewsReducers from "./news/reducers";

export default combineReducers({
  weatherRedusers,
  AuthReducers,
  AutoReducers,
  NewsReducers
});
