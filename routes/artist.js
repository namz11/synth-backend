import express from "express";
import { artistsDL } from "../data/index.js";
import { validations } from "../utils/helpers.js";

const router = express.Router();

router.route("/:id").get(async (req, res, next) => {
  let id = req.params.id;

  try {
    id = validations?.checkSpotifyId(id);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }

  try {
    const data = await artistsDL.getArtistData(id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.route("/:id/top-tracks").get(async (req, res, next) => {
  let id = req.params.id;

  try {
    id = validations?.checkSpotifyId(id);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }

  try {
    const data = await artistsDL.getArtistTopTracks(id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
