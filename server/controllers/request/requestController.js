const Request = require("../../models/request/requestModel")


const sendRequest = async (req, res) => {
    const { sender, reciever, question } = req.body;
    try {
        const newRequest = new Request({
            sender,
            reciever,
            question
        });

        await newRequest.save();
        return res.status(201).json("Request send successfully");
    } catch (error) {
        return res.status(401).json(error.message);

    }



}

const getRequest = async (req, res) => {
    const { userId } = req.params;

    try {
        const request = await Request.find({ reciever: userId }).limit(1);
        if (!request) {
            return res.status(404).json("No request found");
        }
        return res.status(200).json(request);

    } catch (error) {
        return res.status(401).json(error.message)

    }

}

const deleteRejectRequest = async (req, res) => {
    const { id } = req.params;
    const rejectMsg = await Request.find({_id: id});
    await Request.findByIdAndDelete({ _id: id })
    return res.status(200).json({
        message: "has rejected your request",
        rejectMsg: rejectMsg

    });

}
const deleteAcceptRequest = async (req, res) => {
    const { id } = req.params;
    const rejectMsg = await Request.find({_id: id});
    await Request.findByIdAndDelete({ _id: id })
    return res.status(200).json({
        message: "has accepted your request",
        rejectMsg: rejectMsg,
        

    });

}


module.exports = {
    sendRequest: sendRequest,
    getRequest: getRequest,
    deleteRejectRequest: deleteRejectRequest,
    deleteAcceptRequest: deleteAcceptRequest,
}

