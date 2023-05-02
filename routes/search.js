import express from "express";
import { searchDL } from "../data/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Route is Fired");
  try {
    console.log("Into the Route");
    // console.log(req);
    const searchString = req.query.search;
    console.log(`Search String: ${searchString}`);

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
