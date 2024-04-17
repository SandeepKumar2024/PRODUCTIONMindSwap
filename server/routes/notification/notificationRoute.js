const {
  sendNotification,
  getNotification,
  deleteNotification,
  getNotificationByLimit,
} = require("../../controllers/notificationContrl/notificationController");

const express = require("express");

const router = express.Router();

//send
router.post("/notification", sendNotification);
router.get("/notification/:userId", getNotification);
router.get("/notification/limit/:userId", getNotificationByLimit);
router.delete("/notification/:id/:userId", deleteNotification);

module.exports = router;
