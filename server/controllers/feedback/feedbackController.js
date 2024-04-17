const FeedBack = require("../../models/feedback/feedbackModel");
const User = require("../../models/user/userSchema");


//create feedback 
const createFeedback = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });
    try {

        const feedback = new FeedBack({
            name: user.name,
            profilePic: user.profilePic,
            currentPosition: user.currentPosition,
            message: req.body.message,

        })
        await feedback.save();
        return res.status(200).json("Feedback sent successfully");
    } catch (error) {
        res.status(500).json(error);

    }



}

//get feedback only when display is true and show in admin portal
const getAllFeedbacksInAdmin = async (req, res) => {
    try {
        const feedbacks = await FeedBack.find({ isDisplay: true });
        return res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json(error);
    }
}



//get all feedbacks 
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedBack.find();
        return res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteFeedback = async (req, res) => {
    try {
        const feebackId = req.params.feedbackId;
        const feedback = await FeedBack.findByIdAndDelete(feebackId);
        return res.status(200).json("Feedback deleted successfully");


    } catch (error) {
        return res.status(500).json("Feedback");

    }
}

const updateFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.feedbackId;

        // Find the feedback by ID
        const feedback = await FeedBack.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Toggle the value of isDisplay
        feedback.isDisplay = !feedback.isDisplay;

        // Save the updated feedback
        await feedback.save();

        return res.status(200).json( "Feedback updated  successfully");
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}


module.exports = {
    createFeedback,
    getAllFeedbacks,
    deleteFeedback,
    getAllFeedbacksInAdmin,
    updateFeedback
}