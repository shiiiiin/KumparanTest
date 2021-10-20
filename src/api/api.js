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
