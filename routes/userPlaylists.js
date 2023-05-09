import express from "express";
import { userPlaylistsDL } from "../data/index.js";
import { validations } from "../utils/helpers.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";

const router = express.Router();

// this contains all the user playlist routes
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.

      const data = await userPlaylistsDL.getUserPlaylists(userId);
      return res.json(sendList(data));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.

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
    let id = req.params.id;

    try {
      id = validations?.checkFireStoreId(id);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }

    try {
      const data = await userPlaylistsDL.getPlaylistById(id);
      return res.json(sendData(data));
    } catch (error) {
      if (error.message == "Playlist not found") {
        return next({ status: 404, message: error.message });
      } else {
        next(error);
      }
    }
  })
  .put(async (req, res, next) => {
    let id = req.params.id;

    try {
      id = validations?.checkFireStoreId(id);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }

    try {
      await userPlaylistsDL.getPlaylistById(id);
    } catch (error) {
      return next({ status: 404, message: "Playlist not found" });
    }

    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.
      const obj = req.body;
      const data = await userPlaylistsDL.updatePlaylist(id, obj, userId);
      return res.json(sendData(data));
    } catch (error) {
      if (error.message == "User does not have permission") {
        next({ status: 403, message: error.message });
      } else {
        next("Unable to update playlist");
      }
    }
  })
  .delete(async (req, res, next) => {
    let id = req.params.id;

    try {
      id = validations?.checkFireStoreId(id);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }

    try {
      await userPlaylistsDL.getPlaylistById(id);
    } catch (error) {
      return next({ status: 404, message: "Playlist not found" });
    }

    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.
      const data = await userPlaylistsDL.softDeletePlaylist(id, userId);
      if (data) return res.json(sendMessage("Playlist deleted"));
      else return next("Unable to delete");
    } catch (error) {
      if (error.message == "User does not have permission") {
        return next({ status: 403, message: error.message });
      } else {
        return next(error);
      }
    }
  });

router
  .route("/:id/tracks")
  .put(async (req, res, next) => {
    let id = req.params.id;

    try {
      id = validations?.checkFireStoreId(id);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }

    try {
      await userPlaylistsDL.getPlaylistById(id);
    } catch (error) {
      return next({ status: 404, message: "Playlist not found" });
    }

    let { tracks } = req.body;
    try {
      if (!validations?.isValidTracks(tracks)) {
        return next({ status: 400, message: "Invalid tracks" });
      }
    } catch (error) {
      return next({ status: 404, message: "Invalid tracks" });
    }

    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.
      const id = req.params.id;
      const data = await userPlaylistsDL.addTracksToPlaylist(
        id,
        tracks,
        userId
      );
      if (data) return res.json(sendMessage("Added to playlist"));
      else return next("Unable to add");
    } catch (error) {
      if (error.message == "User does not have permission") {
        next({ status: 403, message: error.message });
      } else {
        next(error);
      }
    }
  })
  .delete(async (req, res, next) => {
    let id = req.params.id;

    try {
      id = validations?.checkFireStoreId(id);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }

    try {
      await userPlaylistsDL.getPlaylistById(id);
    } catch (error) {
      return next({ status: 404, message: "Playlist not found" });
    }

    try {
      const userId = req.userId; // Passed the userId from the middleware in the request object.
      const { tracks } = req.body;
      const data = await userPlaylistsDL.removeTrackFromPlaylist(
        id,
        tracks,
        userId
      );
      if (data) return res.json(sendMessage("Removed from playlist"));
      else return next("Unable to remove");
    } catch (error) {
      if (error.message == "User does not have permission") {
        next({ status: 403, message: error.message });
      } else {
        next(error);
      }
    }
  });

export default router;
