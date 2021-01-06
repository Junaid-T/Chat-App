const dotenv = require("dotenv");
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
// const mongo = require("mongodb");
const db = require("./db");

dotenv.config({ path: "./config.env" });

// Set up socket
io.on("connection", (socket) => {
  console.log("Connection made");
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
