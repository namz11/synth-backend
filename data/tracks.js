import db from "../config/db.js";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import store from "../utils/redisStore.js";
import users from "./users.js";
import axiosInstance from "../utils/axiosInstance.js";
import User from "../models/user.model.js";
import { uniq, remove } from "lodash-es";

// TODO aman - remove static id ref form ALL methods in this file [DONE]

const getTrackById = async (id = "11dFghVXANMlKmJXsNCbNl") => {
  const { data } = await axiosInstance.get(
    `https://api.spotify.com/v1/tracks/${id}`
  );
  return data;
};

/**
 * Adds a track to user's most played
 * @param {string} userId
 * @param {string} trackId
 */
const addToMostPlayed = async (userId, trackId = "11dFghVXANMlKmJXsNCbNl") => {
  await store.updateMostPlayedScoreboard(userId, trackId);
  return true;
};

/**
 * Get a users's 10 most played tracks
 * @param {string} userId - the id of user
 */
const getUserMostPlayed = async (userId) => {
  const tracks = await store.getMostPlayedByUser(userId);
  const mostPlayed = [];
  if (tracks?.length > 0) {
    for (const trackId of tracks) {
      const track = await getTrackById(trackId);
      mostPlayed.push({ ...track });
    }
  }
  return mostPlayed;
};

/**
 * Adds a track to user's recently played
 * @param {string} userId
 * @param {string} trackId
 */
const addToRecentPlayed = async (
  userId,
  trackId = "11dFghVXANMlKmJXsNCbNl"
) => {
  const { tracks } = users.getUserById(userId);
  let updatedTracks = remove(tracks);
  if (tracks.length >= 10) {
    updatedTracks.unshift(trackId);
    updatedTracks.slice(0, 10);
  } else {
    updatedTracks.unshift(trackId);
  }
  updatedTracks = uniq(updatedTracks);
  const userRef = doc(db, "users", userId);
  const user = await updateDoc(userRef, { tracks: updatedTracks });
  return true;
};

/**
 * Get recent tracks played by user
 * @param {string} userId - the id of user
 */
const getRecentTracks = async (userId) => {
  const data = await getDoc(doc(db, "users", userId));
  const userData = new User().deserialize(data);
  const recentTracks = [];
  if (userData?.tracks?.length > 0) {
    for (const trackId of userData?.tracks) {
      const track = await getTrackById(trackId);
      recentTracks.push({ ...track });
    }
  }
  return recentTracks;
};

export default {
  getTrackById,
  addToMostPlayed,
  getUserMostPlayed,
  addToRecentPlayed,
  getRecentTracks,
};
