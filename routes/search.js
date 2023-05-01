import express from "express";
import { searchDL } from "../data/index.js";

const router = express.Router();

router.get("/search", async (req, res, next) => {
  try {
    const searchString = req.query.search;

    const tracks = await searchDL.getTracks(searchString);
    const artists = await searchDL.getArtists(searchString);
    const albums = await searchDL.getAlbums(searchString);
    const playlists = await searchDL.getPlaylists(searchString);
    return res.json({
      tracks: tracks,
      artists: artists,
      albums: albums,
      playlists: playlists,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
