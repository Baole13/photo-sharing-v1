import { apiGet } from "./baseApi";

export const getUserListApi = () => {
  return apiGet("/user/list");
};

export const getUserDetailApi = (
  userId
) => {
  return apiGet(`/user/${userId}`);
};