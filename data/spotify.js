import fs from "fs";
const configData = fs.readFileSync("../config.json");
const config = JSON.parse(configData);

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: config.client_id,
  clientSecret: config.client_secret,
  redirectUri: "http://localhost:8888/callback",
});

let accessToken = null;
let refreshToken = null;
let tokenExpirationTime = null;

const setAccessToken = (token) => {
  accessToken = token;
  spotifyApi.setAccessToken(accessToken);
};

const getNewAccessToken = () => {
  if (accessToken) {
    return;
  }

  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      console.log("The access token is " + data.body["access_token"]);
      setAccessToken(data.body["access_token"]);
      refreshToken = data.body["refresh_token"];
      tokenExpirationTime =
        new Date().getTime() + data.body["expires_in"] * 1000;
      spotifyApi.searchTracks("track:Beautiful artist:Eminem").then(
        (data) => {
          console.log("Search results:", data.body.tracks.items);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    (err) => {
      console.log("Something went wrong!", err);
    }
  );
};

if (accessToken && tokenExpirationTime > new Date().getTime()) {
  setAccessToken(accessToken);
} else if (refreshToken) {
  spotifyApi.refreshAccessToken().then(
    (data) => {
      setAccessToken(data.body["access_token"]);
      tokenExpirationTime =
        new Date().getTime() + data.body["expires_in"] * 1000;
    },
    (err) => {
      console.log("Could not refresh access token", err);
      getNewAccessToken();
    }
  );
} else {
  getNewAccessToken();
}
