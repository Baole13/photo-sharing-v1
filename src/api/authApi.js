import { apiPost } from "./baseApi";

export const loginApi = (data) => {
  return apiPost(
    "/auth/login",
    data
  );
};

export const registerApi = (data) => {
  return apiPost("/user", data);
};