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
  POST_POSTING,
  POST_POSTING_PENDING,
  POST_POSTING_FULFILLED,
  POST_POSTING_REJECTED,
  DELETE_REPLY,
  PUT_POSTING,
  DELETE_POSTING,
} from "../actions/actionTypes";
import _ from "lodash";
const initialstate = {
  posts: {
    meta: { isLoading: false },
    data: [],
  },
  isLoadingPostReply: false,
  errorPostReply: "",
  isLoadingPosting: false,
  errorPosting: "",
  isLoadingPutPosting: false,
  errorPutPosting: "",
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
          data: action.payload.data
            ? action.payload.data.reverse()
            : action.payload.data,
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
      const comments = newPosts[selectedIdxPost].comments;
      newPosts[selectedIdxPost] = {
        ...newPosts[selectedIdxPost],
        comments: comments
          ? [...comments, action.payload.data]
          : [action.payload.data],
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

    case DELETE_REPLY: {
      const { postId, commentId } = action.data;

      let clonePostsDeleteReply = _.clone(state.posts.data);
      // eslint-disable-next-line
      const selectedIdxPost = clonePostsDeleteReply.findIndex(
        (post) => post.id == postId
      );
      // eslint-disable-next-line
      const selectedIdxComment = clonePostsDeleteReply[
        selectedIdxPost
      ].comments.findIndex((c) => c.id == commentId);

      let clonecomments = _.clone(
        clonePostsDeleteReply[selectedIdxPost].comments
      );

      clonecomments.splice(selectedIdxComment, 1);
      clonePostsDeleteReply[selectedIdxPost].comments = clonecomments;
      return {
        ...state,
        posts: {
          ...state.posts,
          data: clonePostsDeleteReply,
        },
      };
    }

    case POST_POSTING: {
      return { ...state };
    }
    case POST_POSTING_PENDING: {
      return { ...state, isLoadingPosting: true };
    }
    case POST_POSTING_FULFILLED: {
      let clonePosts = _.clone(state.posts.data);
      clonePosts.unshift(action.payload.data);
      return {
        ...state,
        posts: {
          data: clonePosts,
        },
        isLoadingPosting: false,
      };
    }
    case POST_POSTING_REJECTED: {
      return {
        ...state,
        isLoadingPosting: false,
        errorPosting: "Failed, please try again",
      };
    }
    case PUT_POSTING: {
      const { id } = action.data;

      let clonePostPut = _.clone(state.posts.data);
      // eslint-disable-next-line
      const selectedIdxPost = clonePostPut.findIndex((post) => post.id == id);
      // eslint-disable-next-line
      clonePostPut[selectedIdxPost] = {
        ...clonePostPut[selectedIdxPost],
        ...action.data,
      };

      return {
        ...state,
        posts: {
          data: clonePostPut,
        },
      };
    }

    case DELETE_POSTING: {
      const { id } = action.data;

      let clonePostDelete = _.clone(state.posts.data);
      // eslint-disable-next-line
      const selectedIdxPost = clonePostDelete.findIndex(
        (post) => post.id == id
      );
      // eslint-disable-next-line
      clonePostDelete.splice(selectedIdxPost, 1);

      return {
        ...state,
        posts: {
          data: clonePostDelete,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
