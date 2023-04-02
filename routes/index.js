import usersAPI from "./users.js";

const constructorMethod = (app) => {
  app.use("/api/users", usersAPI);

  app.use("*", (req, res) => {
    res.status(404).json({ success: false, error: "Page not found" });
  });
};

export { constructorMethod };
