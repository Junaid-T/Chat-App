const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const chatRouter = require("./Routes/chatRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  exposedHeaders: "token",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/chat", chatRouter);

module.exports = app;
