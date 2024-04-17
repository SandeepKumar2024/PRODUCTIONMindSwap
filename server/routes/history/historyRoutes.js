
const express = require("express");


const { createHistory, getHistory, deleteHistory, updateHistory } = require("../../controllers/history/historyCntrl");


const router = express.Router()

router.post("/history", createHistory);
router.get("/history/:userId", getHistory);
router.put("/history/update", updateHistory)
router.delete("/history/:historyId", deleteHistory);





module.exports = router;