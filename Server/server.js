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
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      socket.verifiedID = await verifyToken(socket.handshake.query.token);
      next();
    }
  } catch (err) {
    console.log("Rejected");
    socket.emit("Auth Error", "Please provide a valid token");
  }
}).on("connection", async (socket) => {
  console.log("Connection made");

  // Retrieve all of users old messages on connect
  const user = await users.findUserByID(socket.verifiedID);
  socket.verifiedName = user.name;

  if (user.rooms) {
    socket.verifiedRooms = user.rooms;

    const messages = await users.getMessages(socket.verifiedRooms);
    socket.emit("user", { user: socket.verifiedID, messages });

    socket.verifiedRooms.forEach((room) => {
      socket.join(room);
      io.to(room).emit("userJoined", { name: socket.verifiedName, chat: room });
    });
  }

  // Save and emit message to the room
  socket.on("message", (data) => {
    data.name = socket.verifiedName;
    data.time = new Date();
    chats.saveToDB(
      data.room,
      data.message,
      data.user,
      data._id,
      data.name,
      data.time
    );
    io.to(data.room).emit("message", data);
  });

  // Add room to user and add room to users list of rooms
  socket.on("newChat", async (room) => {
    try {
      const created = await chats.createChat(room.id, room.name);
      if (created) {
        await users.joinChat(socket.verifiedID, room.id);
        socket.join(room.id);
        socket.emit("createSuccess", {
          id: room.id,
          name: room.name,
        });
      }
    } catch (err) {
      socket.emit("Error", "Could not create room");
    }
  });

  //   Add room to user and add room to users list of rooms
  socket.on("joinChat", async (room) => {
    try {
      await users.joinChat(socket.verifiedID, room);
      socket.join(room);
      socket.emit("success", "User has joined a new room");
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("userLeft", () => {
    socket.verifiedRooms.forEach((room) => {
      socket.join(room);
      io.to(room).emit("userLeft", { name: socket.verifiedName, chat: room });
    });
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
