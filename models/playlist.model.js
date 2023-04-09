import { helpers } from "../utils/helpers.js";

export default class Playlist {
  constructor(obj) {
    if (obj) {
      this.userId = helpers.sanitizeString(obj?.userId);
      this.name = helpers.sanitizeString(obj?.name);
      if (obj?.tracks?.length) this.tracks = obj?.tracks;
      else this.tracks = [];
    }
  }

  deserialize(playlist) {
    playlist = {
      id: playlist.id,
      ...playlist.data(),
    };
    return playlist;
  }

  serialize(playlist) {
    playlist = {
      ...playlist,
    };
    return playlist;
  }
}
