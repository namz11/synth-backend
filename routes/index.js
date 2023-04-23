import Middleware from "../utils/middleware.js";
import cors from "cors";

import express from "express";
import usersAPI from "./users.js";
import playlistsAPI from "./playlists.js";
import userPlaylistsAPI from "./userPlaylists.js";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = express.Router();

//CORS
router.use(cors(corsOptions));
router.use("/users", Middleware.decodeToken, usersAPI);
router.use("/playlists", Middleware.decodeToken, playlistsAPI);
router.use("/user/playlists", Middleware.decodeToken, userPlaylistsAPI);

export default router;
