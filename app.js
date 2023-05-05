import express from "express";
import routes from "./routes/index.js";
import {
  errorLogger,
  errorHandler,
  failSafeHandler,
} from "./utils/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Page not found" });
});

app.use(errorLogger);
app.use(errorHandler);
app.use(failSafeHandler);

app.listen(8888, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8888");
});
