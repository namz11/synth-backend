import express from "express";
import { tracksDL } from "../data/index.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";
import { validations } from "../utils/helpers.js";

const router = express.Router();

router.route("/user/most-played").get(async (req, res, next) => {
  try {
    const userId = req.userId; // Passed the userId from the middleware in the request object.

    const data = await tracksDL.getUserMostPlayed(userId);
    return res.json(sendList(data));
  } catch (error) {
    next(error);
  }
});

router.route("/user/recent").get(async (req, res, next) => {
  try {
    const userId = req.userId; // Passed the userId from the middleware in the request object.

    const data = await tracksDL.getRecentTracks(userId);
    return res.json(sendList(data));
  } catch (error) {
    next(error);
  }
});

router.route("/user/add").post(async (req, res, next) => {
  const userId = req.userId; // Passed the userId from the middleware in the request object.
  let { trackId } = req.body;

  try {
    trackId = validations?.checkSpotifyId(trackId);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }

  try {
    const mostPlayed = await tracksDL.addToMostPlayed(userId, trackId);
    const recentPlayed = await tracksDL.addToRecentPlayed(userId, trackId);
    if (mostPlayed && recentPlayed)
      return res.json(sendMessage("Added track to user's data"));
    else return next("Error occurred. Try again.");
  } catch (error) {
    next(error);
  }
});

router.route("/:id").get(async (req, res, next) => {
  let id = req.params.id;

  try {
    id = validations?.checkSpotifyId(id);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }

  try {
    const data = await tracksDL.getTrackById(id);
    return res.json(sendData(data));
  } catch (error) {
    next(error);
  }
});

export default router;
