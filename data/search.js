import axiosInstance from "../utils/axiosInstance.js";

const getTracks = async (searchString) => {
  const encodedString = encodeURIComponent(searchString);
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=track:${encodedString}&type=track&market=US&limit=10&offset=0` // Searching a Track
  );
  return data;
};

const getArtists = async (searchString) => {
  const encodedString = encodeURIComponent(searchString);
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=artist:${encodedString}&type=artist&market=US&limit=10&offset=0` // Searching an Artist
  );
  return data;
};

const getAlbums = async (searchString) => {
  const encodedString = encodeURIComponent(searchString);
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=album:${encodedString}&type=album&market=US&limit=10&offset=0` //Searching an Album
  );
  return data;
};

const getPlaylists = async (searchString) => {
  const encodedString = encodeURIComponent(searchString);
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=${encodedString}&type=playlist&market=US&limit=10&offset=0` //Searching an Playlists
  );
  return data;
};

export default {
  getAlbums,
  getTracks,
  getArtists,
  getPlaylists,
};
