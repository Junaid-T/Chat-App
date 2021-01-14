const client = require("./dbConnect");

exports.saveToDB = async function (room, message, user, _id) {
  try {
    const db = client.db("Chat");
    const TEST = db.collection(`${room}`);
    await TEST.insertOne({
      message: message,
      user: user,
      _id: _id,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createChat = async function (room) {
  try {
    const db = client.db("Chat");
    await db.createCollection(room);
    return room;
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
