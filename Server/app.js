const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const path = require("path");

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  exposedHeaders: "token",
};

app.use(cors(corsOptions));

app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("chat-app/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "chat-app", "build", "index.html"));
  });
}

app.use("/api/v1/user", userRouter);

module.exports = app;
