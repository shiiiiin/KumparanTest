import { GET_USER_LIST, GET_POST_LIST } from "./actionTypes";
import { getUserListApi, getPostListApi } from "../api/api";

export const getUserList = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_USER_LIST,
      payload: getUserListApi(),
    });
  };
};

export const getPostList = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_POST_LIST,
      payload: getPostListApi(),
    });
  };
};
