import {
    apiGet,
    apiPost,
  } from "./baseApi";
  
  export const getPhotosOfUserApi = (
    userId
  ) => {
    return apiGet(
      `/photosOfUser/${userId}`
    );
  };
  
  export const addCommentApi = (
    photoId,
    comment
  ) => {
    return apiPost(
      `/commentsOfPhoto/${photoId}`,
      {
        comment,
      }
    );
  };
  
  export const uploadPhotoApi = (
    formData
  ) => {
    return apiPost(
      "/photos/new",
      formData,
      true
    );
  };