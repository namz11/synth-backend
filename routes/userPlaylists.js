import express from "express";
import { userPlaylistsDL } from "../data/index.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.use(middleware.decodeToken);

// this contains all the user playlist routes
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await userPlaylistsDL.getUserPlaylists();
      return res.json(sendList(data));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const obj = req.body;
      const data = await userPlaylistsDL.createPlaylist(obj);
      return res.json(sendData(data));
    } catch (error) {
      next("Unable to create playlist");
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await userPlaylistsDL.getPlaylistById(id);
      return res.json(sendData(data));
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const id = req.params.id;
      const obj = req.body;
      const data = await userPlaylistsDL.updatePlaylist(id, obj);
      return res.json(sendData(data));
    } catch (error) {
      next("Unable to update playlist");
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await userPlaylistsDL.softDeletePlaylist(id);
      if (data) return res.json(sendMessage("Playlist deleted"));
      else return res.json(sendMessage("Unable to delete", false));
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id/tracks")
  .put(async (req, res, next) => {
    try {
      const id = req.params.id;
      const { tracks } = req.body;
      const data = await userPlaylistsDL.addTracksToPlaylist(id, tracks);
      if (data) return res.json(sendMessage("Added to playlist"));
      else return res.json(sendMessage("Unable to add", false));
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = req.params.id;
      const { tracks } = req.body;
      const data = await userPlaylistsDL.removeTrackFromPlaylist(id, tracks);
      if (data) return res.json(sendMessage("Removed from playlist"));
      else return res.json(sendMessage("Unable to remove", false));
    } catch (error) {
      next(error);
    }
  });

export default router;
