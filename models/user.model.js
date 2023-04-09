import { helpers } from "../utils/helpers.js";

// this is an example
export class User {
  constructor(obj) {
    this.firstName = helpers.sanitizeString(obj?.firstName);
    this.lastName = helpers.sanitizeString(obj?.lastName);
    this.email = helpers.sanitizeString(obj?.email);
    this.phone = helpers.sanitizeString(obj?.phone);
    this.dob = obj?.dob;
    this.password = obj?.password;
    this.isVerified = obj?.isVerified || false;
  }

  deserialize(user) {
    user = {
      ...user,
    };
    delete user.password; // do not let the frontend have access to pwd field
    return user;
  }

  serialize(user) {
    user = {
      ...user,
    };
    delete user.password; // do not let the frontend have access to pwd field
    return user;
  }
}
