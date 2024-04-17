const ReportAbuse = require("../../models/reportAbuse/reportModel")
const createReport = async (req, res) => {
  try {
    
    const { reportId, message, type,userId } = req.body;
    const newReport = new ReportAbuse({
        reportId, message, type, userId
    })
    await newReport.save();
    return res.status(200).json("Report sent successfully");
  } catch (error) {
    return res.status(401).json(error.message);
    
  }

}

//get all report in the client side 

const getAllReports = async (req, res) => {
    try {
        const reports = await ReportAbuse.find();
        return res.status(200).json(reports);
    } catch (error) {
        res.status(500).json(error);
    }

}





module.exports = {
    createReport: createReport,
    getAllReports: getAllReports

}