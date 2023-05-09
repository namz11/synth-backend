import express from "express";
import { albumsDL } from "../data/index.js";
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
    const data = await albumsDL.getAlbumData(id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
