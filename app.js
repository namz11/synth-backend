import express from "express";
import { constructorMethod } from "./routes/index.js";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RedisStore = connectRedis(session);
// Configure redis client
const redisClient = createClient({
  legacyMode: true,
});
await redisClient.connect();
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "AuthCookie",
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 1000, // session max age in miliseconds
    },
  })
);

constructorMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
