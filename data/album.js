import axiosInstance from "../utils/axiosInstance.js";

const getAlbumData = async (albumId) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/albums/${albumId}`
  );
  return data;
};

export default {
  getAlbumData,
};
