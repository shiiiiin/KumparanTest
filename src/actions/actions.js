import { GET_USER_LIST } from "./actionTypes";
import { getUserListApi } from "../api/api";

export const getUserList = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_USER_LIST,
      payload: getUserListApi(),
    });
  };
};
