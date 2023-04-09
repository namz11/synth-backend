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
} from "firebase/firestore/lite";
import Playlist from "../models/playlist.model.js";
const playlistsRef = collection(db, "playlists");

const getUserPlaylists = async () => {
  const playlists = (await getDocs(playlistsRef)).docs.map((doc) =>
    new Playlist().deserialize(doc)
  );
  return playlists;
};
const getPlaylistById = async (id) => {
  const playlist = await getDoc(doc(db, "playlists", id));
  return new Playlist().deserialize(playlist);
};
const createPlaylist = async (data) => {
  const newPlaylist = new Playlist(data);
  const playlist = await addDoc(playlistsRef, { ...newPlaylist });
  return await getPlaylistById(playlist.id);
};
const addTracksToPlaylist = async (id, tracks) => {
  const playlistRef = doc(db, "playlists", id);
  await updateDoc(playlistRef, {
    tracks: arrayUnion(...tracks),
  });
  return true;
};
const removeTrackFromPlaylist = async (id, tracks) => {
  const playlistRef = doc(db, "playlists", id);
  await updateDoc(playlistRef, {
    tracks: arrayRemove(...tracks),
  });
  return true;
};

export default {
  getUserPlaylists,
  getPlaylistById,
  createPlaylist,
  addTracksToPlaylist,
  removeTrackFromPlaylist,
};
