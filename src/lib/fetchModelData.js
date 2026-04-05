import models from "../modelData/models";

function fetchModel(url) {
  return new Promise((resolve) => {
    if (url === "/user/list") {
      resolve(models.userListModel());
    } else if (url.startsWith("/user/")) {
      const userId = url.replace("/user/", "");
      resolve(models.userModel(userId));
    } else if (url.startsWith("/photosOfUser/")) {
      const userId = url.replace("/photosOfUser/", "");
      const result = models.photoOfUserModel(userId);
      resolve(result || []);
    } else {
      resolve(null);
    }
  });
}

export default fetchModel;