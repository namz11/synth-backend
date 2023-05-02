import db from "../config/db.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";

const usersRef = collection(db, "users");

const getUsers = async () => {
  const users = (await getDocs(usersRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

const getUserById = async (userId) => {
  // TODO aman - to be done by aman - get user by id from firestore db
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log(userData);
      return { id: userId, ...userData };
    } else {
      console.log("No user is found with the given userId");
    }
  } catch (error) {
    console.error("Failed to get User Doc: ", error);
  }
};

export default {
  getUsers,
  getUserById,
};
