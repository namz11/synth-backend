import express from "express";
import { usersDL } from "../data/index.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.use(middleware.decodeToken);

router
  .route("/")
  .get(async (req, res, next) => {
    const data = await usersDL.getUsers();
    return res.json(data);
  })
  .post(async (req, res) => {
    return res.status(404).send("Not implemented");
  });

export default router;
