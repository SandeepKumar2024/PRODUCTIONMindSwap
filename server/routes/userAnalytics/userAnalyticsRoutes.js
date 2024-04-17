const express = require('express');
const { createUserAnaltics, updateAnalytics, getAllAnalytics } = require('../../controllers/userAnalytics/userAnalyticsController');

const router = express.Router();
router.post('/create/analytics', createUserAnaltics)
router.put('/update/analytics/:senderId/:receiverId', updateAnalytics)
router.get('/analytics/:userId', getAllAnalytics)




module.exports = router;