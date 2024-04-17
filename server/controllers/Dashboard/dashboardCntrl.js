const User = require("../../models/user/userSchema")


const dailyNewRegisterUsers = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day

        const users = await User.find({
            createdAt: { $gte: today },
        });

        // Group users by date
        const dailyRegistrations = users.reduce((acc, user) => {
            const date = user.createdAt.toDateString();
            acc[date] = acc[date] ? acc[date] + 1 : 1;
            return acc;
        }, {});

        res.status(200).send(dailyRegistrations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }



}

//weekly new  users registration in MindSwap

const getWeeklyRegistrations = async (req, res) => {
    try {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const users = await User.find({
            createdAt: { $gte: lastWeek, $lte: today },
        });

        // Group users by week
        const weeklyRegistrations = users.reduce((acc, user) => {
            const weekStart = getWeekStart(user.createdAt);
            acc[weekStart] = acc[weekStart] ? acc[weekStart] + 1 : 1;
            return acc;
        }, {});

        const weeklyData = Object.keys(weeklyRegistrations).map((weekStart) => ({
            weekStart,
            registrations: weeklyRegistrations[weekStart],
        }));

        res.json(weeklyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



// Helper function to get the start of the week for a given date
const getWeekStart = (date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    const weekStart = new Date(currentDate.setDate(diff));
    return weekStart.toDateString();
};

//monthly new user registration 

const getMonthlyRegistrations = async (req, res) => {
    try {
        // Get the current date
        const today = new Date();

        // Get the date of the start of the current month
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Find all users whose createdAt falls within the current month
        const users = await User.find({
            createdAt: { $gte: startOfMonth, $lte: today },
        });

        // Group users by month
        const monthlyRegistrations = users.reduce((acc, user) => {
            // Get the start of the month for the user's createdAt date
            const monthStart = getMonthStart(user.createdAt);

            // Increment the count for the corresponding month or initialize to 1
            acc[monthStart] = acc[monthStart] ? acc[monthStart] + 1 : 1;
            return acc;
        }, {});

        // Convert the grouped data into an array of objects
        const monthlyData = Object.keys(monthlyRegistrations).map((monthStart) => ({
            monthStart,
            registrations: monthlyRegistrations[monthStart],
        }));

        // Send the JSON response with the monthly data
        res.json(monthlyData);
    } catch (error) {
        // If there's an error, log it and send a 500 server error response
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Helper function to get the start of the month for a given date
const getMonthStart = (date) => {
    const currentDate = new Date(date);
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return monthStart.toDateString();
};


//get yearly new registration users 
const getYearlyRegistrations = async (req, res) => {
    try {
        // Get the current date
        const today = new Date();

        // Get the date of the start of the current year
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        // Find all users whose createdAt falls within the current year
        const users = await User.find({
            createdAt: { $gte: startOfYear, $lte: today },
        });

        // Group users by year
        const yearlyRegistrations = users.reduce((acc, user) => {
            // Get the year for the user's createdAt date
            const year = user.createdAt.getFullYear();

            // Increment the count for the corresponding year or initialize to 1
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Convert the grouped data into an array of objects
        const yearlyData = Object.keys(yearlyRegistrations).map((year) => ({
            year: parseInt(year),
            registrations: yearlyRegistrations[year],
        }));

        // Send the JSON response with the yearly data
        res.json(yearlyData);
    } catch (error) {
        // If there's an error, log it and send a 500 server error response
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



//get all users from db till now

let totalUsersByYear = {}; // Initialize total users by year

const updateTotalUsersCount = async () => {
  try {
    const users = await User.find({}, { createdAt: 1 });

    // Calculate total users for each year
    totalUsersByYear = users.reduce((acc, user) => {
      const year = new Date(user.createdAt).getFullYear();
      acc[year] = acc[year] ? acc[year] + 1 : 1;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error updating total users count:", error);
  }
};

// Call the function initially to set the total users count
updateTotalUsersCount();

const getTotalUsersTillNow = async (req, res) => {
  res.json({ totalUsersByYear });
};














module.exports = { dailyNewRegisterUsers: dailyNewRegisterUsers, getWeeklyRegistrations: getWeeklyRegistrations, getMonthlyRegistrations: getMonthlyRegistrations,
getYearlyRegistrations:getYearlyRegistrations,getTotalUsersTillNow:getTotalUsersTillNow
}