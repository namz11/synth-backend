import axiosInstance from "../utils/axiosInstance.js";

const getCategoryPlaylists = async (category_id) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/browse/categories/${category_id}/playlists`
  );
  return data;
};

export default {
  getCategoryPlaylists,
};
