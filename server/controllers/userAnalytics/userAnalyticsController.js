const UserAnalytics = require('../../models/userAnalytics/userAnalyticModel')

const createUserAnaltics = async (req, res) => {

    const { userId, startTime } = req.body;
    try {


        const endTime = Date.now();
        if (startTime === null) {
            return
        }
        const newAnalytics = new UserAnalytics({
            userId: userId,
            startTime: startTime,
            endTime: endTime,

        })

        await newAnalytics.save();
        return res.status(200).json("User Analytic sent successfully");

    } catch (error) {
        return res.status(401).json(error.message);

    }
}

const updateAnalytics = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const endTime = Date.now();

        // Find the history record based on senderId and acceptId
        const newAnalytics = await UserAnalytics.findOneAndUpdate(
            { $or: [{ userId: senderId }, { userId: receiverId }] },
            { $set: { endTime: endTime } }, // Update endTime
            { new: true } // Return the updated document
        );

        return res.status(200).json(newAnalytics);

    } catch (error) {
        return res.status(401).json(error)

    }
}




const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
const getAllAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay; // approximation
        const oneYear = 365 * oneDay; // approximation

        // Fetch all sessions for the specific user
        // const allSessions = await UserAnalytics.find({ userId });
        const allSessions = await UserAnalytics.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $group: {
                    _id: { userId: "$userId", startTime: "$startTime" },
                    doc: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" }
            }
        ]);



        // Create an object to store monthly and weekly data
        const monthlyData = {};
        const weeklyData = {};
        const yearlyData = {};

        // Iterate through each session
        allSessions.forEach(session => {
            const sessionMonthYear = `${session.startTime.getMonth() + 1}-${session.startTime.getFullYear()}`;
            const sessionWeekYear = `${getWeekNumber(session.startTime)}-${session.startTime.getFullYear()}`;
            const sessionYear = session.startTime.getFullYear();

            // Initialize monthlyData if not already present
            if (!monthlyData[sessionMonthYear]) {
                monthlyData[sessionMonthYear] = {
                    totalSessions: 0,
                    totalSessionTime: 0
                };
            }

            // Initialize weeklyData if not already present
            if (!weeklyData[sessionWeekYear]) {
                weeklyData[sessionWeekYear] = {
                    totalSessions: 0,
                    totalSessionTime: 0
                };
            }

            // Initialize yearlyData if not already present
            if (!yearlyData[sessionYear]) {
                yearlyData[sessionYear] = {
                    totalSessions: 0,
                    totalSessionTime: 0
                };
            }


            // Increment total sessions for the month and week
            monthlyData[sessionMonthYear].totalSessions++;
            weeklyData[sessionWeekYear].totalSessions++;
            yearlyData[sessionYear].totalSessions++;


            // Calculate session time for the session
            const sessionTime = session.endTime - session.startTime;
            monthlyData[sessionMonthYear].totalSessionTime += sessionTime;
            weeklyData[sessionWeekYear].totalSessionTime += sessionTime;
            yearlyData[sessionYear].totalSessionTime += sessionTime;
        });

        // Calculate today's date with time set to midnight
        const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(todayMidnight.getTime() + oneDay);

        // Filter sessions for today
        const todaySessions = allSessions.filter(session =>
            session.startTime >= todayMidnight && session.startTime < endOfToday
        );

        // Initialize an array to hold session counts for each hour



        // Calculate today's total sessions and total session time
        const totalSessionsToday = todaySessions.length;
        const totalSessionTimeToday = todaySessions.reduce((acc, session) => {
            return acc + (session.endTime - session.startTime);
        }, 0);

        const hourlySessionCounts = new Array(24).fill(0);
        // Iterate through today's sessions and count sessions for each hour
        todaySessions.forEach(session => {
            const hour = session.startTime.getHours();
            hourlySessionCounts[hour] += 1;

        })

        const hourlySessionTime = new Array(24).fill(0);

        // Iterate through today's sessions and accumulate session time for each hour
        todaySessions.forEach(session => {
            const hour = session.startTime.getHours();

            const sessionTime = (session.endTime - session.startTime);
            hourlySessionTime[hour] += sessionTime;
        });

        //Weekly sessions data
        const weeklyLabels = Object.keys(weeklyData);
        const weeklySessionsData = Object.values(weeklyData).map(data => data.totalSessions);
        const weeklySessionTimeData = Object.values(weeklyData).map(data => data.totalSessionTime); // Convert ms to hours

        // Prepare data for plotting
        const monthlyLabels = Object.keys(monthlyData);
        const monthlySessionsData = Object.values(monthlyData).map(data => data.totalSessions);
        const monthlySessionTimeData = Object.values(monthlyData).map(data => data.totalSessionTime); // Convert ms to hours

        //Yearly sessions data
        const yearlyLabels = Object.keys(yearlyData);
        const yearlySessionsData = Object.values(yearlyData).map(data => data.totalSessions);
        const yearlySessionTimeData = Object.values(yearlyData).map(data => data.totalSessionTime); // Convert ms to hours

        // Calculate total sessions and total session time for all recorded data
        const totalSessionsCount = allSessions.length;
        const totalSessionTime = allSessions.reduce((acc, session) => {
            return acc + (session.endTime - session.startTime);
        }, 0)

        // Response with monthly, weekly, and today's analytics
        res.status(200).json({
            monthlyData: monthlyData,
            monthlyLabels: monthlyLabels,
            monthlySessionsData: monthlySessionsData,
            monthlySessionTimeData: monthlySessionTimeData,
            weeklyData: weeklyData,
            weeklyLabels: weeklyLabels,
            weeklySessionsData: weeklySessionsData,
            weeklySessionTimeData: weeklySessionTimeData,
            totalSessionsToday: totalSessionsToday,
            totalSessionTimeToday: totalSessionTimeToday,
            totalSessionsCount: totalSessionsCount,
            totalSessionTime: totalSessionTime,
            yearlyData: yearlyData,
            yearlyLabels: yearlyLabels,
            yearlySessionsData: yearlySessionsData,
            yearlySessionTimeData: yearlySessionTimeData,
            hourlySessionCounts: hourlySessionCounts,
            hourlySessionTime: hourlySessionTime,

        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Helper function to get the week number
function getWeekNumber(d) {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / oneDay);
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}


module.exports = {
    createUserAnaltics, updateAnalytics, getAllAnalytics
}