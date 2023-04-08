import express from "express";
import { playlistDL } from "../data/index.js";

const router = express.Router();

router.route("/category").get(async (req, res, next) => {
  try {
    const data = await playlistDL.getCategoryPlaylists("pop");
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
