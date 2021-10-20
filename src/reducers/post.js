import {
  GET_POST_LIST,
  GET_POST_LIST_PENDING,
  GET_POST_LIST_FULFILLED,
  GET_POST_LIST_REJECTED,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_PENDING,
  GET_COMMENTS_BY_POST_ID_FULFILLED,
  GET_COMMENTS_BY_POST_ID_REJECTED,
} from "../actions/actionTypes";
import _ from "lodash";
const initialstate = {
  posts: {
    meta: { isLoading: false },
    data: [],
  },
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

    default:
      return state;
  }
};

export default reducer;
