const client = require("./dbConnect");
const ObjectID = require("mongodb").ObjectID;

exports.createUser = async function (email, password) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = users.insertOne({
      email: email,
      password: password,
      rooms: [],
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.findUser = async function (email) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = await users.findOne({ email: email });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findUserByID = async function (id) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = await users.findOne({ _id: ObjectID(id) });
    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.getMessages = async function (rooms) {
  try {
    const db = client.db("Chat");
    const allMessages = {};

    for (const room of rooms) {
      const collection = db.collection(room);
      const docs = await collection.find({});
      const messages = await docs.toArray();
      allMessages[room] = messages;
    }
    return allMessages;
  } catch (err) {
    console.log(err);
  }
};

exports.joinChat = async function (room) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = await users.find({ email: "test@test.com" }).toArray();
    console.log(user[0]);
    const newRooms = [...user[0].rooms, room];
    await users.updateOne(
      { email: "test@test.com" },
      { $set: { rooms: newRooms } }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.client = client;
