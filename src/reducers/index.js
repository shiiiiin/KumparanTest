import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import albums from "./albums";

const reducers = {
  user,
  post,
  albums,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
