import db from "../config/db.js";
import { collection, getDocs } from "firebase/firestore/lite";

const usersRef = collection(db, "users");

const getUsers = async () => {
  const users = (await getDocs(usersRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

const getUserById = async () => {
  // TODO aman - to be done by aman
  return { id: "6XjK055WpDVvPNkiUy4P7BF1hvQ2", tracks: [] };
};

export default {
  getUsers,
  getUserById,
};
