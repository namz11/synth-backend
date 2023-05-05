import axiosInstance from "../utils/axiosInstance.js";

const getCategoryPlaylists = async (category_id) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/browse/categories/${category_id}/playlists`
  );
  return data;
};

const getFeaturedPlaylists = async () => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/browse/featured-playlists`
  );
  return data;
};

const getPlaylistData = async (playlistId) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`
  );

  let tracks = data.tracks.items;
  while (data.tracks.next) {
    const response = await axiosInstance.get(data.tracks.next);
    data.tracks = response.data;
    tracks = [...tracks, ...data.tracks.items];
  }

  data.tracks.items = tracks;

  return data;
};

export default {
  getCategoryPlaylists,
  getFeaturedPlaylists,
  getPlaylistData,
};
