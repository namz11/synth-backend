import express from "express";
import { constructorMethod } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

constructorMethod(app);

app.listen(8888, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8888");
});
