const express = require("express");
const { createChat, userChats, findChat, updateUnreadMessage, getUnreadMessage, deleteUnreadMessage, getUnseenMessages, markMessagesAsSeen } = require("../../controllers/Chat/chatControllers");
const router = express.Router();

//chat routes
router.post("/", createChat);
router.get("/:id", userChats);
router.get("/find/:firstId/:secondId", findChat);
router.post("/unread", updateUnreadMessage);
router.get("/unread/:chatId", getUnreadMessage);
router.put("/read/:chatId", deleteUnreadMessage);
router.get("/unseen/:userId", getUnseenMessages);
router.put("/seen/:userId/:chatId", markMessagesAsSeen);


module.exports = router;
