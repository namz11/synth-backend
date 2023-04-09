import express from "express";
import usersAPI from "./users.js";
import playlistsAPI from "./playlists.js";
import userPlaylistsAPI from "./userPlaylists.js";

const router = express.Router();

// add all routes here
router.use("/users", usersAPI);
router.use("/playlists", playlistsAPI);
router.use("/user/playlists", userPlaylistsAPI);

export default router;
