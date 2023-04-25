import express from "express";
import usersAPI from "./users.js";
import playlistsAPI from "./playlists.js";
import userPlaylistsAPI from "./userPlaylists.js";
import artistAPI from "./artist.js";
import albumAPI from "./album.js";
import tracksAPI from "./tracks.js";

const router = express.Router();

// add all routes here
router.use("/users", usersAPI);
router.use("/playlists", playlistsAPI);
router.use("/user/playlists", userPlaylistsAPI);
router.use("/artist", artistAPI);
router.use("/album", albumAPI);
router.use("/tracks", tracksAPI);

export default router;
