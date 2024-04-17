const messageModel = require("../../models/chatModel/messageModel");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const newMessage = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
     const message = await newMessage.save();
    return res.status(200).send(message);
  } catch (error) {
    console.log(error);
  }
};


//read the message of unread conversation
const readMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const readMessage = await messageModel.findByIdAndUpdate(chatId,{$set:{}})
  } catch (error) {

    
  }
}

const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await messageModel.find({ chatId });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getMessage, createMessage };
