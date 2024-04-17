const History = require("../../models/history/historyModel")

const createHistory = async (req, res) => {

    const { senderId, acceptId } = req.body;

    try {

        const startTime = Date.now();

        const senderHistory = new History({
            senderId: senderId,
            startTime: startTime,
            acceptId: acceptId,

        })
        await senderHistory.save();

        return res.status(200).json("Created successfully");
    } catch (error) {
        return res.status(401).json(error)

    }

}


//update history 
const updateHistory = async (req, res) => {
    const { senderId, acceptId } = req.body;
    try {
        const endTimeSet = Date.now();

        //update history of the sender
        const history = await History.findOneAndUpdate(
            { senderId: senderId, acceptId: acceptId,endTime: {$exists: false}},
            { $set: { endTime: endTimeSet } }, // Update endTime
            { new: true } // Return the updated document
        );



        return res.status(200).json(history);
    } catch (error) {
        return res.status(401).json(error)
    }
}



const getHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await History.find({ $or: [{ senderId: userId }, { acceptId: userId }] });
        return res.status(200).json(history);
    } catch (error) {
        return res.status(401).json(error)

    }
}


//delete history
const deleteHistory = async (req, res) => {
    try {

        const { historyId } = req.params;
        await History.findByIdAndDelete(historyId);
        return res.status(200).json({
            message: "has deleted your history"
        });
    } catch (error) {
        return res.status(401).json(error)

    }
}

module.exports = { createHistory, updateHistory, getHistory, deleteHistory }//delete history 






