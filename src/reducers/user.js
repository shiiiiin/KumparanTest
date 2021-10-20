import {
  GET_USER_LIST,
  GET_USER_LIST_PENDING,
  GET_USER_LIST_FULFILLED,
  GET_USER_LIST_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loginUser: {
    email: "shintiatria@gmail.com",
    name: "Shintia Tria Sari",
    username: "Shintiatria",
  },
  users: {
    meta: { isLoading: false },
    data: [],
  },
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_USER_LIST: {
      return { ...state };
    }
    case GET_USER_LIST_PENDING: {
      return { ...state, users: { ...state.user, meta: { isLoading: true } } };
    }
    case GET_USER_LIST_FULFILLED: {
      return {
        ...state,
        users: {
          data: action.payload.data,
          meta: {
            isLoading: false,
          },
        },
      };
    }
    case GET_USER_LIST_REJECTED: {
      return {
        ...state,
        users: {
          data: [],
          meta: {
            isLoading: false,
            error: "Failed get user, please refresh the page",
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
