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
