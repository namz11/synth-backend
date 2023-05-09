// #FIREBASEAUTH This way, I can import the admin from firebase config (backend). In this case, the admin is already initialized.
import admin from "../config/firebase-config.js";

// #FIREBASEAUTH This is the code for authorizing the tokens. In case the user is unauthenticated, the api call will fail and an error can be thrown or a page can be displayed for notifying the unauthorized access.
class Middleware {
  async decodeToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.userId = decodeValue.user_id;
        return next();
      }

      return res.status(401).json({ message: "Unauthorized" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Error" });
    }
  }
}

export default new Middleware();
