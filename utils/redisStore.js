import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

// const endpoint = process.env.REDIS_ENDPOINT_URL || "127.0.0.1:6379";
// const password = process.env.REDIS_PASSWORD || null;
// const [host, port] = endpoint.split(":");

// // const client = createClient();
// const client = createClient({
//   socket: {
//     host: host,
//     port: +port,
//   },
//   password,
// });
// client.on("error", (err) => console.log("Redis Client Error", err));
// client.on("connect", function (err) {
//   console.log("Connected to redis successfully");
// });
// await client.connect();

const client = createClient({
  url: "redis://default:958a67d17a4b4558888b137b13557bbf@us1-flowing-insect-37189.upstash.io:37189",
});
client.on("error", function (err) {
  throw err;
});
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
