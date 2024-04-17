const express = require('express');
const { createReportProblem,getAllReportProblem } = require('../../controllers/reportProblem/reportProblem');

const router = express.Router();
router.post("/create/problem/:userId", createReportProblem);
router.get("/get/problem", getAllReportProblem);




module.exports = router