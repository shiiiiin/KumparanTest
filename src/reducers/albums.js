import {
  GET_ALBUMS,
  GET_ALBUMS_FULFILLED,
  GET_ALBUMS_PENDING,
  GET_ALBUMS_REJECTED,
  GET_PHOTOS_BY_ALBUM,
  GET_PHOTOS_BY_ALBUM_PENDING,
  GET_PHOTOS_BY_ALBUM_FULFILLED,
  GET_PHOTOS_BY_ALBUM_REJECTED,
} from "../actions/actionTypes";
import _ from "lodash";

const initialstate = {
  albums: {
    meta: { isLoading: false },
    data: [],
  },
  photos: {},
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

    case GET_PHOTOS_BY_ALBUM: {
      return { ...state };
    }
    case GET_PHOTOS_BY_ALBUM_PENDING: {
      return {
        ...state,
      };
    }
    case GET_PHOTOS_BY_ALBUM_FULFILLED: {
      const photosPayload = action.payload.data;
      const albumId =
        photosPayload && photosPayload.length !== 0
          ? photosPayload[0].albumId
          : null;
      let clonePhotoState = _.clone(state.photos);
      const isExisting = clonePhotoState[albumId.toString()];

      if (albumId && !isExisting) {
        clonePhotoState[albumId.toString()] = photosPayload;
        return {
          ...state,
          photos: clonePhotoState,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case GET_PHOTOS_BY_ALBUM_REJECTED: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
