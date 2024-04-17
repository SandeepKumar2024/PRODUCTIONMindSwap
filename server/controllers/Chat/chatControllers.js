const chatModel = require("../../models/chatModel/chats");
const Message = require("../../models/chatModel/messageModel");

//create chat for new user
const createChat = async (req, res) => {

  const chat = await chatModel.findOne({ members: { $all: [req.body.recieverId, req.body.senderId] } })
  if (chat) {
    return res.status(201).send("User is already in your Conversation, Open Chat");
  }
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    await newChat.save();
    return res.status(200).send("Successfully added to your chat, Open Chat");
  } catch (error) {
    console.log(error);
  }
};
//get userChats all chats
const userChats = async (req, res) => {
  try {
    const results = await chatModel.find({
      members: { $in: [req.params.id] },
    });

    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
  }
};

//update unreadCount in db of a particular user 
// const unreadCount = async (req,res)=>{
//   try{
//     const user = await chatModel.findOneAndUpdate(
//       { members: { $all: [req.params.userId] } },
//       { $set: { unreadCount: req.body.unreadCount } },
//       { new: true }
//     );
//     return res.status(200).send(user);
//   }catch(error){
//     console.log(error);
//   }
// }

//get only specific chat
const findChat = async (req, res) => {
  try {
    const user = await chatModel.find({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};


//unread message
const updateUnreadMessage = async (req, res) => {
  const { chatId } = req.body;
  try {

    // Update unread count for the conversation
    await chatModel.findByIdAndUpdate(
      { _id: chatId },
      { $inc: { unreadCount: 1 } }, // Increment unread count by 1
      { new: true } // Return the updated conversation
    );
    return res.status(200).send("increment Successfully");
  } catch (error) {
    console.log(error);
  }
};

//get unread message 
const getUnreadMessage = async (req, res) => {
  try {
    const chatInfo = await chatModel.findById({ _id: req.params.chatId });
    return res.status(200).send(chatInfo);
  } catch (error) {
    return res.status(500).send(error.message)

  }
}

const deleteUnreadMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    await chatModel.findByIdAndUpdate(
      { _id: chatId },
      { $set: { unreadCount: 0 } }, // Set unread count to 0
      { new: true } // Return the updated conversation
    );
    return res.status(200).send("decrement Successfully");
  } catch (error) {
    return res.status(500).send(error.message)

  }
}


//update seen messages


const getUnseenMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch chats where the user is a member and seen is false
    const chatInfo = await chatModel.find({ members: userId, seen: false });

    // Calculate the count of unseen messages for each chat
    const unseenMessagesCount = await Promise.all(chatInfo.map(async (chat) => {
      const count = await Message.countDocuments({ chatId: chat._id, senderId: { $ne: userId }, seenMsg: false });
      return { chatId: chat._id, unseenCount: count };
    }));

    // Merge chatInfo and unseenMessagesCount
    const result = chatInfo.map(chat => {
      const unseenCountInfo = unseenMessagesCount.find(item => item.chatId.toString() === chat._id.toString());
      return {
        _id: chat._id,
        members: chat.members,
        seen: chat.seen,
        unseenCount: unseenCountInfo ? unseenCountInfo.unseenCount : 0
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const markMessagesAsSeen = async (req, res) => {
  try {
    const { chatId, userId } = req.params;
    // Update the seen status of messages for the specified chat and user
    await Message.updateMany({ chatId, senderId: { $ne: userId }, seenMsg: false }, { seenMsg: true });
    return res.status(200).send('Messages marked as seen successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = { createChat, findChat, userChats, updateUnreadMessage, getUnreadMessage, deleteUnreadMessage, getUnseenMessages,markMessagesAsSeen };
