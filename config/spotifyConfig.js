import axios from "axios";

// The spotify token was returned from an initial echange of authorization code for access token.
// The refresh token can be used any number of times to get a new access token.
// If we want a new refresh token, we need to go through the authorization code flow again, which Dom did manually.
const refreshSpotifyToken =
  "AQDGrJtrgf4Ejg88VqwI1fGS7RWv4L-Na3Lk7zHPbgSPgoASaAHhEcHkAJ9R9OVcVdhQJ_16CJ5eruKHS2f5WFr-kkO7IabLec1U46DepaX2L9nsRmy92nkTG_u67Eznl0s";
// The encoded authorization string is the base64 encoding of the client id and client secret.
// string = "Basic " + base64Encode(client_id + ":" + client_secret)
const encodedAuthorizationString =
  "Basic MDIwM2JhYzllZGI5NDk3MTk3NDlhMjk0YzIyZGU4NWM6MWU0YmMzNmNjODNlNDcyOTkwMDNhYjM5YjNmMTJhMjk=";

const getSpotifyToken = async () => {
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
