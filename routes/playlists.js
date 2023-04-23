import express from "express";
import { playlistsDL } from "../data/index.js";

const router = express.Router();

// this contains all the spotify routes
router.route("/category").get(async (req, res, next) => {
  try {
    const toplists = await playlistsDL.getCategoryPlaylists("toplists");
    const hihop = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFQ00XGBls6ym"
    );
    const rock = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFDXXwE9BDJAr"
    );
    const workout = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFAXlCG6QvYQ4"
    );
    const indie = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFCWjUTdzaG0e"
    );
    const mood = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFzHmL4tf05da"
    );
    const chill = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFFzDl7qN9Apr"
    );
    const jazz = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFAJ5xb0fwo9m"
    );
    const focus = await playlistsDL.getCategoryPlaylists(
      "0JQ5DAqbMKFCbimwdOYlsl"
    );
    const playlists = [
      { message: "", title: "Top Lists", ...toplists },
      { message: "", title: "Hip-Hop", ...hihop },
      { message: "", title: "Rock", ...rock },
      { message: "", title: "Workout", ...workout },
      { message: "", title: "Indie", ...indie },
      { message: "", title: "Mood", ...mood },
      { message: "", title: "Chill", ...chill },
      { message: "", title: "Jazz", ...jazz },
      { message: "", title: "Focus", ...focus },
    ];
    return res.json(playlists);
  } catch (error) {
    next(error);
  }
});
router.route("/featured").get(async (req, res, next) => {
  try {
    const data = await playlistsDL.getFeaturedPlaylists();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
