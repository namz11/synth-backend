// #FIREBASEAUTH Need to install firebase-admin from npm
import admin from "firebase-admin";

// #FIREBASEAUTH service account file can be downloaded somewhere from firebase application console
import serviceAccount from "./serviceAccounts.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://synth-6f232-default-rtdb.firebaseio.com",
});

export default admin;
