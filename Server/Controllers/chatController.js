const client = require("../Models/chatModel");

exports.getMessages = async (req, res, next) => {
  try {
    const chat = client.db("Chat");
    const TEST = chat.collection("Test Room"); //Temp hardcode collection name
    const docs = await TEST.find({});
    const messages = await docs.toArray();
    res.status(200).json({
      status: "success",
      data: {
        id: 236236,
        messages: messages,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
