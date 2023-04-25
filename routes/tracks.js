import express from "express";
import { tracksDL } from "../data/index.js";
import { sendData, sendList, sendMessage } from "../utils/helpers.js";

const router = express.Router();

router.route("/user/most-played").get(async (req, res, next) => {
  try {
    // TODO aman - setup userId & send it to data functions
    const data = await tracksDL.getUserMostPlayed();
    return res.json(sendList(data));
  } catch (error) {
    next(error);
  }
});

router.route("/user/recent").get(async (req, res, next) => {
  try {
    // TODO aman - setup userId & send it to data functions
    const data = await tracksDL.getRecentTracks();
    return res.json(sendList(data));
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

router.route("/user/add").post(async (req, res, next) => {
  const userId = "narmit"; // TODO aman - setup userId & send it to data functions
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

export default router;
