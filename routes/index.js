import express from "express";
import usersAPI from "./users.js";
import playlistsAPI from "./playlists.js";

const router = express.Router();

// add all routes here
router.use("/users", usersAPI);
router.use("/playlists", playlistsAPI);

export default router;
