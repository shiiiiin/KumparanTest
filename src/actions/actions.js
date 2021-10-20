import {
  GET_USER_LIST,
  GET_POST_LIST,
  GET_COMMENTS_BY_POST_ID,
  POST_REPLY,
} from "./actionTypes";
import {
  getUserListApi,
  getPostListApi,
  getCommentsByPostIdApi,
  postReplyApi,
} from "../api/api";

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

export const getCommentsByPostId = () => {
  return (dispatch, getState) => {
    const store = getState(),
      posts = store.post?.posts?.data ?? [];
    posts.map(async (post) => {
      return dispatch({
        type: GET_COMMENTS_BY_POST_ID,
        payload: getCommentsByPostIdApi(post.id),
      });
    });
  };
};

export const postReply = (postId, reply) => {
  return (dispatch, getState) => {
    const store = getState();
    const loginUser = store.user.loginUser;
    const dataReply = {
      postId: postId,
      name: loginUser.name,
      email: loginUser.email,
      body: reply,
    };

    return dispatch({
      type: POST_REPLY,
      payload: postReplyApi(postId, dataReply),
    });
  };
};
