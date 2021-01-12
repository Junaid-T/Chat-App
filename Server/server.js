const dotenv = require("dotenv");
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
// const mongo = require("mongodb");
const db = require("./db");

dotenv.config({ path: "./config.env" });

// AUTH MIDDLEWARE - PREVENTS USER FROM GETTING DATA WITHOUT TOKEN
io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log(`Token: ${socket.handshake.query.token}`);
    next();
  } else {
    socket.emit("Auth Error", "Auth Error");
    next("err");
  }
});

// Set up socket
io.on("connection", (socket) => {
  console.log("Connection made");

  // Find all of the users rooms
  // And retreive the messages in those rooms and sent to the user
  const rooms = db.findRooms().then((rooms) => {
    const messages = db.getMessages(rooms).then((messages) => {
      socket.emit("oldMessages", messages);
    });
  });

  // const messages = db
  //   .getMessages(["236236", "236263", "246324"])
  //   .then((messages) => {
  //     socket.emit("oldMessages", messages);
  //   });
  // Place a socket in all of its requested rooms
  reqRooms = socket.request._query.rooms.split(",");
  reqRooms.forEach((room) => {
    socket.join(room);
  });
  // Save and emit message to the room
  socket.on("message", (data) => {
    db.saveToDB(data.room, data.message, data.user, data._id);
    io.to(data.room).emit("message", data);
  });
});

const port = 3001;
http.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
