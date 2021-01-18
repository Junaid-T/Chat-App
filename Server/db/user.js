const client = require("./dbConnect");
const ObjectID = require("mongodb").ObjectID;
const validate = require("validate");
const bcrypt = require("bcrypt");

const userSchema = new validate({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    length: { min: 8 },
  },
  confirmPassword: {
    type: String,
    required: true,
    length: { min: 8 },
  },
});

exports.createUser = async function (name, email, password, confirmPassword) {
  try {
    const errors = await userSchema.validate({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (errors.length > 1) {
      return false;
    }
    const db = client.db("Chat");
    const users = db.collection("users");

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = users.insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      rooms: [],
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

// Used for finding the user for authentification
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

// This is used to find the user rooms and chats - token payload has the id which is why this is needed.
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

exports.joinChat = async function (ID, room) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = await users.findOne({ _id: ObjectID(ID) });
    // const user = await users.findOne({ email: "test@test.com" });
    const newRooms = [...user.rooms, room];
    await users.updateOne({ _id: ObjectID(ID) }, { $set: { rooms: newRooms } });
  } catch (err) {
    console.log(err);
  }
};

exports.leaveChat = async function (room) {
  try {
    const db = client.db("Chat");
    const users = db.collection("users");
    const user = await users.findOne({ email: "test@test.com" });
    const target = user.rooms.indexOf(room);
    const newRooms = user.rooms.splice(target, 1);
    await users.updateOne(
      { email: "test@test.com" },
      { $set: { rooms: newRooms } }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.client = client;
