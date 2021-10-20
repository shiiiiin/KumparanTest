import { apiClient } from "./apiClient";

export const getUserListApi = () => {
  return apiClient.get(`/users`);
};

export const getPostListApi = () => {
  return apiClient.get(`/posts`);
};

export const getCommentsByPostIdApi = (postId) => {
  return apiClient.get(`/posts/${postId}/comments`);
};

export const postReplyApi = (postId, dataReply) => {
  return apiClient.post(`/posts/${postId}/comments`, dataReply);
};

export const deleteReplyApi = (commentId) => {
  return apiClient.delete(`/comments/${commentId}`);
};

export const postPostingApi = (dataPosting) => {
  return apiClient.post(`/posts`, dataPosting);
};

export const getAlbumsApi = () => {
  return apiClient.get(`/albums`);
};

export const getPhotosByAlbumApi = (albumId) => {
  return apiClient.get(`/albums/${albumId}/photos`);
};
