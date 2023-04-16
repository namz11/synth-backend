// #FIREBASEAUTH This way, I can import the admin from firebase config (backend). In this case, the admin is already initialized.
import admin from "../config/firebase-config.js";

// #FIREBASEAUTH This is the code for authorizing the tokens. In case the user is unauthenticated, the api call will fail and an error can be thrown or a page can be displayed for notifying the unauthorized access.
class Middleware {
  async decodeToken(req, res, next) {
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: "Missing Authorization header" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      //   console.log(typeof (await admin.auth().verifyToken(token)));
      const decodeValue = await admin.auth().verifyIdToken(token);
      // console.log(`Decode value: ${decodeValue}`);
      console.log("Middleware Fired");
      if (decodeValue) {
        return next();
      }

      return res.json({ message: "Unauthorized" });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Internal Error" });
    }
  }
}

// module.exports = new Middleware();
export default new Middleware();