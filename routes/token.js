import express from "express";
import store from "../utils/redisStore.js";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  // Gets spotify token from redis store
  const token = await store.getSpotifyTokenFromStore();
  if (token == null) {
    return res.status(404).send("Token not set");
  }
  return res.json({ token: token });
});

export default router;
