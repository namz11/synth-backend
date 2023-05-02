import express from "express";
import { userPlaylistsDL } from "../data/index.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";

const router = express.Router();

// this contains all the user playlist routes
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      const data = await userPlaylistsDL.getUserPlaylists(userId);
      return res.json(sendList(data));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      const obj = req.body;
      const data = await userPlaylistsDL.createPlaylist(obj, userId);
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
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      // TODO narmit - add same user check
      const id = req.params.id;
      const obj = req.body;
      const data = await userPlaylistsDL.updatePlaylist(id, obj, userId);
      return res.json(sendData(data));
    } catch (error) {
      next("Unable to update playlist");
    }
  })
  .delete(async (req, res, next) => {
    try {
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      // TODO narmit - add same user check
      const id = req.params.id;
      const data = await userPlaylistsDL.softDeletePlaylist(id, userId);
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
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      // TODO narmit - add same user check
      const id = req.params.id;
      const { tracks } = req.body;
      const data = await userPlaylistsDL.addTracksToPlaylist(
        id,
        tracks,
        userId
      );
      if (data) return res.json(sendMessage("Added to playlist"));
      else return res.json(sendMessage("Unable to add", false));
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      // TODO aman - setup userId & send it to data functions [DONE]
      const userId = req.userId; // Passed the userId from the middleware in the request object. It can be accessed. in this way
      console.log(userId);

      // TODO narmit - add same user check
      const id = req.params.id;
      const { tracks } = req.body;
      const data = await userPlaylistsDL.removeTrackFromPlaylist(
        id,
        tracks,
        userId
      );
      if (data) return res.json(sendMessage("Removed from playlist"));
      else return res.json(sendMessage("Unable to remove", false));
    } catch (error) {
      next(error);
    }
  });

export default router;
