import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

const reducers = {
  user,
  post,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
