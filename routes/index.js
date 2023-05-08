import Middleware from "../utils/middleware.js";
import cors from "cors";

import express from "express";
import usersAPI from "./users.js";
import playlistsAPI from "./playlists.js";
import userPlaylistsAPI from "./userPlaylists.js";
import artistAPI from "./artist.js";
import albumAPI from "./album.js";
import tracksAPI from "./tracks.js";
import tokenAPI from "./token.js";
import searchAPI from "./search.js";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const router = express.Router();

// add all routes here
router.use(cors(corsOptions));
router.use("/users", Middleware.decodeToken, usersAPI);
router.use("/playlists", Middleware.decodeToken, playlistsAPI);
router.use("/user/playlists", Middleware.decodeToken, userPlaylistsAPI);
router.use("/artist", Middleware.decodeToken, artistAPI);
router.use("/album", Middleware.decodeToken, albumAPI);
router.use("/tracks", Middleware.decodeToken, tracksAPI);
router.use("/token", Middleware.decodeToken, tokenAPI);
router.use("/search", Middleware.decodeToken, searchAPI);

export default router;
