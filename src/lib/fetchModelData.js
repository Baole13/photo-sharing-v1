function fetchModel(url) {
  const BASE_API = "https://2pqjg8-8080.csb.app/";
  return new Promise((resolve, reject) => {
    fetch(BASE_API + url, {
      method: "GET",
      credentials: "include", // Đồng bộ để gửi session cookie lên server
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve({ data: data }))
      .catch((error) => reject(error));
  });
}

export default fetchModel;
