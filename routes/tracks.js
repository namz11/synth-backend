import express from "express";
import { tracksDL } from "../data/index.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";

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

  try {
    const { trackId } = req.body;
    const mostPlayed = await tracksDL.addToMostPlayed(userId, trackId);
    const recentPlayed = await tracksDL.addToRecentPlayed(userId, trackId);
    if (mostPlayed && recentPlayed)
      return res.json(sendMessage("Added track to user's data"));
    else return res.json(sendMessage("Error occurred. Try again.", false));
  } catch (error) {
    next(error);
  }
});

router.route("/:id").get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await tracksDL.getTrackById(id);
    return res.json(sendData(data));
  } catch (error) {
    next(error);
  }
});

export default router;
