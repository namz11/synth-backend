import db from "../config/db.js";
import { collection, getDocs } from "firebase/firestore/lite";

const usersRef = collection(db, "users");

const getUsers = async () => {
  const users = (await getDocs(usersRef)).docs.map((doc) => doc.data());
  return users;
};

export default {
  getUsers,
};
