import axios from "axios";

const spotifyConfig = {
  clientId: "0203bac9edb949719749a294c22de85c",
  clientSecret: "1e4bc36cc83e47299003ab39b3f12a29",
};

// The spotify token was returned from an initial echange of authorization code for access token.
// The refresh token can be used any number of times to get a new access token.
// If we want a new refresh token, we need to go through the authorization code flow again, which Dom did manually.
const refreshSpotifyToken =
  "AQD4A80_P1IXFFjfLcnGJd6LjpTv3L1QrOMWPKROG8iHzgBlTYssVNNZvq_Q6fqSVmBdYkQzLk49-6Z31XKqyLPme0ZVFeyC1A-f1BwY2G0UIIcjUFSK9qYSaFS19RO_TMA";
// The encoded authorization string is the base64 encoding of the client id and client secret.
// string = "Basic " + base64Encode(client_id + ":" + client_secret)
const encodedAuthorizationString =
  "Basic MDIwM2JhYzllZGI5NDk3MTk3NDlhMjk0YzIyZGU4NWM6MWU0YmMzNmNjODNlNDcyOTkwMDNhYjM5YjNmMTJhMjk=";

const getSpotifyToken = async () => {
  console.log("fetching spotify token");
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: encodedAuthorizationString,
    },
  };
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=refresh_token&refresh_token=" + refreshSpotifyToken,
      headers
    );
    return response.data.access_token;
  } catch (err) {
    console.log(err);
  }
};

export default getSpotifyToken;
