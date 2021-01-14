const dotenv = require("dotenv");
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const verifyToken = require("./Utilities/verifyToken");
const chats = require("./db/chat");
const users = require("./db/user");

dotenv.config({ path: "./config.env" });

// AUTH MIDDLEWARE - PREVENTS USER FROM GETTING DATA WITHOUT TOKEN
io.use(async function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    socket.verifiedID = await verifyToken(socket.handshake.query.token);
    next();
  } else {
    socket.emit("Auth Error", "Auth Error");
    next("err");
  }
});

// Set up socket
io.on("connection", async (socket) => {
  console.log("Connection made");

  // Retrieve all of users old messages on connect
  const user = await users.findUserByID(socket.verifiedID);
  socket.verifiedRooms = user.rooms;
  const messages = await users.getMessages(socket.verifiedRooms);
  socket.emit("oldMessages", messages);

  socket.verifiedRooms.forEach((room) => {
    socket.join(room);
  });

  // const rooms = users.findUserByID(socket.verifiedID).then((user) => {
  //   const messages = users.getMessages(user.rooms).then((messages) => {
  //     socket.emit("oldMessages", messages);
  //   });
  // });

  // const messages = db
  //   .getMessages(["236236", "236263", "246324"])
  //   .then((messages) => {
  //     socket.emit("oldMessages", messages);
  //   });

  // Place user in all of its requested rooms
  // reqRooms = socket.request._query.rooms.split(",");
  // reqRooms.forEach((room) => {
  //   socket.join(room);
  // });

  // Save and emit message to the room
  socket.on("message", (data) => {
    chats.saveToDB(data.room, data.message, data.user, data._id);
    io.to(data.room).emit("message", data);
  });

  // Add room to user and add room to users list of rooms
  socket.on("newChat", async (room) => {
    try {
      const created = await chats.createChat(room);
      await users.joinChat(room);
      socket.join(room);
      socket.emit("success", "User has created a new room");
    } catch (err) {
      console.log(err);
    }
  });

  //   Add room to user and add room to users list of rooms
  socket.on("joinChat", async (room) => {
    try {
      await users.joinChat(room);
      socket.join(room);
      socket.emit("success", "User has joined a new room");
    } catch (err) {
      console.log(err);
    }
  });
});

const port = 3001;
http.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
