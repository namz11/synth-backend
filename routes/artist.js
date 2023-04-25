import express from "express";
import { artistsDL } from "../data/index.js";

const router = express.Router();

router.route("/:id").get(async (req, res, next) => {
  try {
    const data = await artistsDL.getArtistData(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.route("/:id/top-tracks").get(async (req, res, next) => {
  try {
    const data = await artistsDL.getArtistTopTracks(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
