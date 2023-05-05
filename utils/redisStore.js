import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.REDIS_ENDPOINT_URI || "127.0.0.1:6379";
const password = process.env.REDIS_PASSWORD || null;
const [host, port] = endpoint.split(":");

const client = createClient({
  socket: {
    host,
    port,
  },
  password,
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", function (err) {
  console.log("Connected to redis successfully");
});
await client.connect();

//#region basic
const existsInStore = async (key) => await client.exists(key?.trim());
const getFromStore = async (key) => await client.get(key?.trim());
const addToStore = async (key, value) => await client.set(key?.trim(), value);
const getJsonFromStore = async (key) =>
  JSON.parse(await client.get(key?.trim()));
const addJsonToStore = async (key, value) =>
  await client.set(key?.trim(), JSON.stringify(value));
//#endregion

//#region spotify token
const getSpotifyTokenFromStore = async () => {
  if (await existsInStore(`spotifyToken`)) {
    return await getFromStore(`spotifyToken`);
  }
  return null;
};
const addSpotifyTokenToStore = async (token) =>
  await addToStore(`spotifyToken`, token);
//#endregion

//#region most played
const updateMostPlayedScoreboard = async (userId, trackId) => {
  // copied from p hill lecture code
  // first let's check to see if it's in the search term list
  let existsInScoreBoard = await client.zRank(`${userId}mostPlayed`, trackId);
  if (existsInScoreBoard !== null) {
    // It has been found in the list so let's increment it by 1
    await client.zIncrBy(`${userId}mostPlayed`, 1, trackId);
  } else {
    //If the search term is not found in the list, then we know to add it
    await client.zAdd(`${userId}mostPlayed`, {
      score: 1,
      value: trackId,
    });
  }
};
const getMostPlayedByUser = async (userId) =>
  await client.zRange(`${userId}mostPlayed`, 0, 9, { REV: true });
//#endregion

const store = {
  // basic
  existsInStore,
  getFromStore,
  addToStore,
  getJsonFromStore,
  addJsonToStore,
  // spotify token
  getSpotifyTokenFromStore,
  addSpotifyTokenToStore,
  updateMostPlayedScoreboard,
  getMostPlayedByUser,
};

export default store;
