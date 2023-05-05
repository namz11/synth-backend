import { helpers } from "../utils/helpers.js";

export default class User {
  constructor(obj) {
    this.firstName = helpers.sanitizeString(obj?.firstName);
    this.lastName = helpers.sanitizeString(obj?.lastName);
    this.email = helpers.sanitizeString(obj?.email);
    this.photoUrl = helpers.sanitizeString(obj?.photoUrl);
    this.displayName = helpers.sanitizeString(obj?.displayName);
    this.recentTracks = [];
  }

  deserialize(user) {
    user = {
      id: user.id,
      ...user.data(),
    };
    return user;
  }

  serialize(user) {
    user = {
      ...user,
    };
    return user;
  }
}
