const express = require('express');
const { createReport, getAllReports } = require('../../controllers/reportAbuse/reportCntrl');

const router = express.Router();
router.post("/create/report", createReport)
router.get("/getAll/reportAbuse", getAllReports)







module.exports = router