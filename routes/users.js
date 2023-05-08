import express from "express";
import { usersDL } from "../data/index.js";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const data = await usersDL.getUsers();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
