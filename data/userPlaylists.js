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
const playlistsRef = collection(db, "playlists");

/**
 * Get a user's created playlists
 * @param {string} userId
 */
const getUserPlaylists = async (userId = "narmit") => {
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
  return new Playlist().deserialize(playlist);
};

/**
 * Add playlist to db
 * @param {Object} data - playlist data
 */
const createPlaylist = async (data) => {
  const newPlaylist = new Playlist(data);
  const playlist = await addDoc(playlistsRef, {
    ...newPlaylist,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return await getPlaylistById(playlist.id);
};

/**
 * update playlist - does not update - userId, tracks, images
 * @param {string} id - the id of playlist
 * @param {Object} data - playlist data
 */
const updatePlaylist = async (id, data) => {
  const newPlaylist = new Playlist(data);
  delete newPlaylist.userId;
  delete newPlaylist.tracks;
  delete newPlaylist.images;
  delete newPlaylist.createdAt;
  const playlistRef = doc(db, "playlists", id);
  const playlist = await updateDoc(playlistRef, {
    ...newPlaylist,
    updatedAt: serverTimestamp(),
  });
  return await getPlaylistById(playlist.id);
};

/**
 * Add tracks to playlist
 * @param {string} id - the id of playlist
 * @param {Object[]} tracks - an array of tracks to add
 * @param {string} tracks[].id - id of track
 * @param {string} tracks[].images[].url - url of track image
 */
const addTracksToPlaylist = async (id, tracks) => {
  const playlistRef = doc(db, "playlists", id);

  const images = tracks
    .filter((t) => t?.images?.length && t?.images[0]?.url?.trim() !== "")
    .map((x) => x?.images[0]?.url?.trim());

  await updateDoc(playlistRef, {
    tracks: arrayUnion(...tracks.map((track) => track.id)),
    images: arrayUnion(...images),
    updatedAt: serverTimestamp(),
  });
  return true;
};

/**
 * Remove tracks from playlist
 * @param {string} id - the id of playlist
 * @param {string[]} tracks - an array of trackId
 */
const removeTrackFromPlaylist = async (id, tracks) => {
  const playlistRef = doc(db, "playlists", id);
  await updateDoc(playlistRef, {
    tracks: arrayRemove(...tracks),
    updatedAt: serverTimestamp(),
  });
  return true;
};

/**
 * soft delete playlist
 * @param {string} id - the id of playlist
 */
const softDeletePlaylist = async (id) => {
  const playlistRef = doc(db, "playlists", id);
  await updateDoc(playlistRef, {
    isActive: false,
    updatedAt: serverTimestamp(),
  });
  return true;
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
