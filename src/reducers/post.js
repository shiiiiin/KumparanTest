import {
  GET_POST_LIST,
  GET_POST_LIST_PENDING,
  GET_POST_LIST_FULFILLED,
  GET_POST_LIST_REJECTED,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_PENDING,
  GET_COMMENTS_BY_POST_ID_FULFILLED,
  GET_COMMENTS_BY_POST_ID_REJECTED,
  POST_REPLY,
  POST_REPLY_PENDING,
  POST_REPLY_FULFILLED,
  POST_REPLY_REJECTED,
  PUT_REPLY,
} from "../actions/actionTypes";
import _ from "lodash";
const initialstate = {
  posts: {
    meta: { isLoading: false },
    data: [],
  },
  isLoadingPostReply: false,
  errorPostReply: "",
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_POST_LIST: {
      return { ...state };
    }
    case GET_POST_LIST_PENDING: {
      return { ...state, posts: { ...state.posts, meta: { isLoading: true } } };
    }
    case GET_POST_LIST_FULFILLED: {
      return {
        ...state,
        posts: {
          data: action.payload.data,
          meta: {
            isLoading: false,
          },
        },
      };
    }
    case GET_POST_LIST_REJECTED: {
      return {
        ...state,
        posts: {
          data: [],
          meta: {
            isLoading: false,
            error: "Failed get post, please refresh the page",
          },
        },
      };
    }

    case GET_COMMENTS_BY_POST_ID: {
      return { ...state };
    }
    case GET_COMMENTS_BY_POST_ID_PENDING: {
      return { ...state };
    }
    case GET_COMMENTS_BY_POST_ID_FULFILLED: {
      const comments = action.payload.data;
      const postId = comments.length !== 0 ? comments[0].postId : null;
      let newPosts = _.clone(state.posts.data);
      const selectedIdxPost = newPosts.findIndex((post) => post.id === postId);
      newPosts[selectedIdxPost] = {
        ...newPosts[selectedIdxPost],
        comments: action.payload.data,
      };
      return {
        ...state,
        posts: {
          ...state.posts,
          data: newPosts,
          meta: {
            isLoading: false,
          },
        },
      };
    }
    case GET_COMMENTS_BY_POST_ID_REJECTED: {
      return {
        ...state,
        posts: {
          data: [],
          meta: {
            isLoading: false,
            error: "Failed get post, please refresh the page",
          },
        },
      };
    }

    case POST_REPLY: {
      return { ...state };
    }
    case POST_REPLY_PENDING: {
      return { ...state, isLoadingPostReply: true };
    }
    case POST_REPLY_FULFILLED: {
      const comment = action.payload.data;
      const postId = comment ? comment.postId : null;
      let newPosts = _.clone(state.posts.data);
      // eslint-disable-next-line
      const selectedIdxPost = newPosts.findIndex((post) => post.id == postId);
      newPosts[selectedIdxPost] = {
        ...newPosts[selectedIdxPost],
        comments: [...newPosts[selectedIdxPost].comments, action.payload.data],
      };

      return {
        ...state,
        posts: {
          ...state.posts,
          data: newPosts,
        },
        isLoadingPostReply: false,
      };
    }
    case POST_REPLY_REJECTED: {
      return {
        ...state,
        isLoadingPostReply: false,
        errorPostReply: "Failed post reply, please try again",
      };
    }

    case PUT_REPLY: {
      const comment = action.data.dataReply;
      const postId = comment ? comment.postId : null;
      const commentId = comment ? comment.id : null;
      let newPosts = _.clone(state.posts.data);
      // eslint-disable-next-line
      const selectedIdxPost = newPosts.findIndex((post) => post.id == postId);
      // eslint-disable-next-line
      const selectedIdxComment = newPosts[selectedIdxPost].comments.findIndex(
        (c) => c.id == commentId
      );

      newPosts[selectedIdxPost].comments[selectedIdxComment] = {
        ...comment,
      };

      return {
        ...state,
        posts: {
          ...state.posts,
          data: newPosts,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
