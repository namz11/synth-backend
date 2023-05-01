import axiosInstance from "../utils/axiosInstance.js";

const getTracks = async (searchString) => {
  console.log(`Search String: ${searchString}`);
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=track:${searchString}&type=track&market=US&limit=10&offset=0` // Searching a Track
  );
  console.log(data);
  return data;
};

const getArtists = async (searchString) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=artist:${searchString}&type=artist&market=US&limit=10&offset=0` // Searching an Artist
  );
  console.log(data);
  return data;
};

const getAlbums = async (searchString) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=album:${searchString}&type=album&market=US&limit=10&offset=0` //Searching an Album
  );
  console.log(data);
  return data;
};

const getPlaylists = async (searchString) => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/search?q=${searchString}&type=playlist&market=US&limit=10&offset=0` //Searching an Playlists
  );
  console.log(data);
  return data;
};

export default {
  getAlbums,
  getTracks,
  getArtists,
  getPlaylists,
};
