import axios from "axios";

function useApi(token = null) {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default useApi;
