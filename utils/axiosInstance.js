import axios from "axios";
import getSpotifyToken from "../config/spotifyConfig.js";
import store from "./redisStore.js";

const axiosInstance = axios.create();

// request interceptor for axios
axiosInstance.interceptors.request.use(
  async (config) => {
    // setup the initial token when server starts
    if (!(await store.getSpotifyTokenFromStore())) {
      await store.addSpotifyTokenToStore(await getSpotifyToken());
    }

    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${await store.getSpotifyTokenFromStore()}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor for axios
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error?.response?.data?.error?.status === 401 &&
      error?.response?.data?.error?.message === "Invalid access token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await store.addSpotifyTokenToStore(await getSpotifyToken());
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${await store.getSpotifyTokenFromStore()}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
