import { helpers } from "../utils/helpers.js";

export default class User {
  constructor(obj) {
    this.firstName = helpers.sanitizeString(obj?.firstName);
    this.lastName = helpers.sanitizeString(obj?.lastName);
    this.email = helpers.sanitizeString(obj?.email);
    this.photoURL = helpers.sanitizeString(obj?.photoURL);
    this.displayName = helpers.sanitizeString(obj?.displayName);
    this.dateOfBirth = obj?.dateOfBirth;
    this.emailVerified = obj?.emailVerified;
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
