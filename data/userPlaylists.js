import db from "../config/db.js";
import {
  collection,
  doc,
  getDocs,
  arrayUnion,
  arrayRemove,
  addDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore/lite";
import Playlist from "../models/playlist.model.js";
import { validations } from "../utils/helpers.js";

const playlistsRef = collection(db, "playlists");

/**
 * Get a user's created playlists
 * @param {string} userId
 */
const getUserPlaylists = async (userId) => {
  const qRef = query(
    playlistsRef,
    where("isActive", "==", true),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );
  const playlists = (await getDocs(qRef)).docs.map((doc) =>
    new Playlist().deserialize(doc)
  );
  return playlists;
};

/**
 * Get a playlist's details from db
 * @param {string} id - the id of playlist
 */
const getPlaylistById = async (id) => {
  const playlist = await getDoc(doc(db, "playlists", id));
  if (playlist.exists()) {
    return new Playlist().deserialize(playlist);
  }
  throw new Error("Playlist not found");
};

/**
 * Add playlist to db
 * @param {Object} data - playlist data
 */
const createPlaylist = async (data, userId) => {
  const newPlaylist = new Playlist({ ...data, userId });
  const playlist = await addDoc(playlistsRef, {
    ...newPlaylist,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return await getPlaylistById(playlist.id);
};

/**
 * update playlist - does not update - userId, tracks
 * @param {string} id - the id of playlist
 * @param {Object} data - playlist data
 */
const updatePlaylist = async (id, data, userId) => {
  const newPlaylist = new Playlist(data);
  delete newPlaylist.userId;
  delete newPlaylist.tracks;
  delete newPlaylist.createdAt;
  const playlistRef = doc(db, "playlists", id);
  const playlist = await getPlaylistById(id);
  if (playlist.userId === userId) {
    await updateDoc(playlistRef, {
      ...newPlaylist,
      updatedAt: serverTimestamp(),
    });
    return await getPlaylistById(id);
  } else {
    throw new Error("User does not have permission");
  }
};

/**
 * Add tracks to playlist
 * @param {string} id - the id of playlist
 * @param {Object[]} tracks - an array of tracks to add
 * @param {string} tracks[].id - id of track
 */
const addTracksToPlaylist = async (id, tracks, userId) => {
  const playlistRef = doc(db, "playlists", id);
  const playlist = await getPlaylistById(id);
  // TODO validate tracks
  if (playlist.userId === userId) {
    if (validations?.isValidTracks(tracks)) {
      await updateDoc(playlistRef, {
        tracks: arrayUnion(...tracks.map((track) => track.id)),
        updatedAt: serverTimestamp(),
      });
      return true;
    } else {
      throw new Error("Invalid tracks");
    }
  } else {
    throw new Error("User does not have permission");
  }
};

/**
 * Remove tracks from playlist
 * @param {string} id - the id of playlist
 * @param {string[]} tracks - an array of trackId
 */
const removeTrackFromPlaylist = async (id, tracks, userId) => {
  const playlistRef = doc(db, "playlists", id);
  const playlist = await getPlaylistById(id);
  if (playlist.userId === userId) {
    await updateDoc(playlistRef, {
      tracks: arrayRemove(...tracks),
      updatedAt: serverTimestamp(),
    });
    return true;
  } else {
    throw new Error("User does not have permission");
  }
};

/**
 * soft delete playlist
 * @param {string} id - the id of playlist
 */
const softDeletePlaylist = async (id, userId) => {
  const playlistRef = doc(db, "playlists", id);
  const playlist = await getPlaylistById(id);
  if (playlist.userId === userId) {
    await updateDoc(playlistRef, {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
    return true;
  } else {
    throw new Error("User does not have permission");
  }
};

/**
 * permanently delete playlist
 * @param {string} id - the id of playlist
 */
const hardDeletePlaylist = async (id) => {
  const playlistRef = doc(db, "playlists", id);
  await deleteDoc(playlistRef);
  return true;
};

export default {
  getUserPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  addTracksToPlaylist,
  removeTrackFromPlaylist,
  softDeletePlaylist,
};
