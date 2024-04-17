const ReportProblem = require("../../models/reportProblem/reportProblemModel");



//create feedback 
const createReportProblem = async (req, res) => {
    const { userId } = req.params;

    try {

        const feedback = new ReportProblem({
            userId: userId,
            message: req.body.message,

        })
        await feedback.save();
        return res.status(200).json("Problem reported successfully");
    } catch (error) {
        res.status(500).json(error);

    }



}


//get all feedbacks 

const getAllReportProblem = async (req, res) => {
    try {
        const feedbacks = await ReportProblem.find();
        return res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createReportProblem,
    getAllReportProblem
}