import axiosInstance from "../utils/axiosInstance.js";

const getArtistData = async (artistId) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/artists/${artistId}`
  );
  return data;
};

const getArtistTopTracks = async (artistId) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`
  );
  return data;
};

export default {
  getArtistData,
  getArtistTopTracks,
};
