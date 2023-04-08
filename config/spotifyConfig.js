import axios from "axios";

const spotifyConfig = {
  clientId: "0203bac9edb949719749a294c22de85c",
  clientSecret: "1e4bc36cc83e47299003ab39b3f12a29",
};

const getSpotifyToken = async () => {
  console.log("fetching spotify token");
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: spotifyConfig.clientId,
      password: spotifyConfig.clientSecret,
    },
  };
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      headers
    );
    return response.data.access_token;
  } catch (err) {
    console.log(err);
  }
};

export default getSpotifyToken;
