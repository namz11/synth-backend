// #FIREBASEAUTH This way, I can import the admin from firebase config (backend). In this case, the admin is already initialized.
import admin from "../config/firebase-config.js";

// #FIREBASEAUTH This is the code for authorizing the tokens. In case the user is unauthenticated, the api call will fail and an error can be thrown or a page can be displayed for notifying the unauthorized access.
class Middleware {
  async decodeToken(req, res, next) {
    console.log(req.query);
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
      console.log("No Auth Header");
      return res.json({ message: "Missing Authorization header" });
    }
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.userId = decodeValue.user_id;
        return next();
      }

      return res.json({ message: "Unauthorized" });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Internal Error" });
    }
  }
}

export default new Middleware();
