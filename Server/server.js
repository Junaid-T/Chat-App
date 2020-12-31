const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
// const mongo = require("mongodb");
const db = require("./db");

dotenv.config({ path: "./config.env" });

// //Database Connection
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// const client = new mongo.MongoClient(
//   DB,
//   { useUnifiedTopology: true },
//   (err, db) => {
//     if (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// );
// client.connect();

// const saveToDB = async function (room, message, user, id) {
//   try {
//     const db = client.db("Chat");
//     const TEST = db.collection(`${room}`);
//     TEST.insertOne({
//       message: message,
//       user: user,
//       _id: id,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// Set up socket
io.on("connection", (socket) => {
  console.log("Connection made");

  socket.on("message", (data) => {
    db.saveToDB(data.room, data.message, data.user, data._id);
    io.emit("message", data);
  });
});

const port = 3001;
http.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
