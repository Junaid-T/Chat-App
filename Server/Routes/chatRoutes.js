const express = require("express");
const chatController = require("../Controllers/chatController");

const router = express.Router();

// Review if this is done right.
//router.route("/:chatID").get(chatController.getMessages); --LATER
// router.route("/").get(chatController.getMessages);
// router.route("createchat").post(chatController.createChat);

module.exports = router;
