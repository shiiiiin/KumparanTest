import {
  GET_USER_LIST,
  GET_POST_LIST,
  GET_COMMENTS_BY_POST_ID,
  POST_REPLY,
  PUT_REPLY,
  DELETE_REPLY,
  POST_POSTING,
  PUT_POSTING,
  DELETE_POSTING,
  GET_ALBUMS,
  GET_PHOTOS_BY_ALBUM,
} from "./actionTypes";
import {
  getUserListApi,
  getPostListApi,
  getCommentsByPostIdApi,
  postReplyApi,
  postPostingApi,
  getAlbumsApi,
  getPhotosByAlbumApi,
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

export const getCommentsByPostId = ({ postId }) => {
  return (dispatch, getState) => {
    if (postId) {
      return dispatch({
        type: GET_COMMENTS_BY_POST_ID,
        payload: getCommentsByPostIdApi(postId),
      });
    }
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

export const putReply = (postId, idComment, reply) => {
  return (dispatch, getState) => {
    const store = getState();
    const loginUser = store.user.loginUser;
    const dataReply = {
      postId: postId,
      name: loginUser.name,
      email: loginUser.email,
      body: reply,
      id: idComment,
      reply,
    };

    return dispatch({
      type: PUT_REPLY,
      data: { postId, idComment, dataReply },
    });
  };
};

export const deleteReply = (postId, commentId) => {
  return (dispatch) => {
    return dispatch({
      type: DELETE_REPLY,
      data: { postId, commentId },
    });
  };
};

export const postPosting = (title, body) => {
  return (dispatch, getState) => {
    const store = getState();
    const loginUser = store.user.loginUser;
    const dataPosting = {
      userId: loginUser.id,
      title: title,
      body: body,
    };
    return dispatch({
      type: POST_POSTING,
      payload: postPostingApi(dataPosting),
    });
  };
};

export const putPostting = (dataPosting) => {
  return (dispatch) => {
    return dispatch({
      type: PUT_POSTING,
      data: dataPosting,
    });
  };
};

export const deletePosting = (dataPosting) => {
  return (dispatch) => {
    return dispatch({
      type: DELETE_POSTING,
      data: dataPosting,
    });
  };
};

export const getAlbums = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_ALBUMS,
      payload: getAlbumsApi(),
    });
  };
};

export const getPhotosByAlbum = (albumId) => {
  return (dispatch) => {
    return dispatch({
      type: GET_PHOTOS_BY_ALBUM,
      payload: getPhotosByAlbumApi(albumId),
      data: { albumId },
    });
  };
};
