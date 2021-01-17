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

exports.createChat = async function (id, name) {
  try {
    const db = client.db("Chat");
    // const collection = db.collection(id);
    const collection = await db.createCollection(id);
    await collection.insertOne({ name: name });
    //await db.createCollection(id);
    return id;
  } catch (err) {
    throw new Error();
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
