import { apiClient } from "./apiClient";

export const getUserListApi = () => {
  return apiClient.get(`/users`);
};
