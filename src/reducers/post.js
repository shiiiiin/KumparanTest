import {
  GET_POST_LIST,
  GET_POST_LIST_PENDING,
  GET_POST_LIST_FULFILLED,
  GET_POST_LIST_REJECTED,
} from "../actions/actionTypes";

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
      return { ...state, posts: { ...state.user, meta: { isLoading: true } } };
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

    default:
      return state;
  }
};

export default reducer;
