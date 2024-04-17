const express = require('express');
const { dailyNewRegisterUsers, getWeeklyRegistrations, getMonthlyRegistrations, getYearlyRegistrations, getTotalUsersTillNow } = require('../../controllers/Dashboard/dashboardCntrl');

const router = express.Router();

router.get('/dashboard/dailyUsers',dailyNewRegisterUsers )
router.get('/dashboard/weeklyUsers',getWeeklyRegistrations )
router.get('/dashboard/monthlyUsers',getMonthlyRegistrations )
router.get('/dashboard/yearlyUsers',getYearlyRegistrations)
router.get('/dashboard/totalUsers',getTotalUsersTillNow)





module.exports = router;