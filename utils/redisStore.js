import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.REDIS_ENDPOINT_URL || "127.0.0.1:6379";
const password = process.env.REDIS_PASSWORD || null;
const [host, port] = endpoint.split(":");

// const client = createClient();
const client = createClient(+port, host);
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

const getSpotifyTokenFromStore = async () => {
  if (await existsInStore(`spotifyToken`)) {
    return await getFromStore(`spotifyToken`);
  }
  return null;
};
const addSpotifyTokenToStore = async (token) =>
  await addToStore(`spotifyToken`, token);

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
};

export default store;
