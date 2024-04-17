const express = require("express");
const { createMessage, getMessage, updateUnreadMessage } = require("../../controllers/Chat/messageControllers");
const router = express.Router();

//chat routes
router.post("/", createMessage);
router.get("/:chatId", getMessage);

module.exports = router;
