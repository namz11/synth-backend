import db from "../config/db.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import User from "../models/user.model.js";

const usersRef = collection(db, "users");

const getUsers = async () => {
  const users = (await getDocs(usersRef)).docs.map((doc) =>
    new User().deserialize(doc)
  );
  return users;
};

const getUserById = async (id) => {
  const user = await getDoc(doc(db, "users", id));
  return new User().deserialize(user);
};

export default {
  getUsers,
  getUserById,
};
