const dotenv = require("dotenv");
const mongo = require("mongodb");

dotenv.config({ path: "./config.env" });

//Database Connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const client = new mongo.MongoClient(
  DB,
  { useUnifiedTopology: true },
  (err, db) => {
    if (err) {
      console.log(err);
      throw err;
    }
  }
);
client.connect();

exports.saveToDB = async function (room, message, user, _id) {
  try {
    const db = client.db("Chat");
    const TEST = db.collection(`${room}`);
    TEST.insertOne({
      message: message,
      user: user,
      _id: _id,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMessages = async function () {
  try {
    const db = client.db("Chat");
    const TEST = db.collection("Test Room");
    TEST.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

exports.client = client;
