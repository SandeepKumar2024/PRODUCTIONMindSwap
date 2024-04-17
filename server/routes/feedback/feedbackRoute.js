const { createFeedback, getAllFeedbacks, deleteFeedback, getAllFeedbacksInAdmin, updateFeedback } = require("../../controllers/feedback/feedbackController")

const express = require('express');

const router = express.Router();

router.post("/create/feedback/:userId", createFeedback)
router.get("/get/feedback", getAllFeedbacks)
router.get("/get/feedback/admin", getAllFeedbacksInAdmin)
router.delete("/delete/feedback/:feedbackId", deleteFeedback);
router.put("/update/feedback/:feedbackId", updateFeedback)





module.exports = router;