const API_BASE_URL =
  "https://2pqjg8-8082.csb.app";

const getToken = () => {
  return localStorage.getItem("token");
};

async function handleResponse(response) {
  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(errorText);
  }

  return response.json();
}

export async function apiGet(path) {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return handleResponse(response);
}

export async function apiPost(
  path,
  body,
  isFormData = false
) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  if (!isFormData) {
    headers["Content-Type"] =
      "application/json";
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      method: "POST",

      headers,

      body: isFormData
        ? body
        : JSON.stringify(body),
    }
  );

  return handleResponse(response);
}