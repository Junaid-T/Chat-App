const express = require("express");
const chatController = require("../Controllers/chatController");

const router = express.Router();

// Review if this is done right.
//router.route("/:chatID").get(chatController.getMessages); --LATER
// router.route("/").get(chatController.getMessages);

module.exports = router;
