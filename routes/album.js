import express from "express";
import { albumsDL } from "../data/index.js";

const router = express.Router();

router.route("/:id").get(async (req, res, next) => {
  try {
    const data = await albumsDL.getAlbumData(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
