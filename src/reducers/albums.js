import {
  GET_ALBUMS,
  GET_ALBUMS_FULFILLED,
  GET_ALBUMS_PENDING,
  GET_ALBUMS_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  albums: {
    meta: { isLoading: false },
    data: [],
  },
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_ALBUMS: {
      return { ...state };
    }
    case GET_ALBUMS_PENDING: {
      return {
        ...state,
        albums: { ...state.albums, meta: { isLoading: true } },
      };
    }
    case GET_ALBUMS_FULFILLED: {
      return {
        ...state,
        albums: {
          data: action.payload.data,
          meta: {
            isLoading: false,
          },
        },
      };
    }
    case GET_ALBUMS_REJECTED: {
      return {
        ...state,
        albums: {
          data: [],
          meta: {
            isLoading: false,
            error: "Failed get albums, please refresh the page",
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
