const Notification = require("../../models/notification/notificationModel");
const userSignup = require("../../models/user/userSchema");

const sendNotification = async (req, res) => {
  const { message, type, sender } = req.body;

  try {
    let notification;
    const existingNotification = await Notification.findOne({
      message,
      type,
      sender
    });

    
    if (type === "all") {
      // Send notification to all users
      const allUsers = await userSignup.find({}, "_id");
      const recieverIds = allUsers.map((user) => user._id);
      notification = new Notification({
        sender,
        message,
        type,
        reciever: recieverIds,
      });
    } else {
      const { reciever, question, url } = req.body;
      notification = new Notification({
        sender,
        message,
        reciever,
        question,
        url
      });
    }
    await notification.save();
    return res.status(201).json(notification);
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
// Fetching Notification
const getNotification = async (req, res) => {
  const userId = req.params.userId;
  try {
    const notice = await Notification.find({ reciever: userId }).sort({ timestamp: -1 });
    if (!notice) {
      return res.status(404).json("No notice found");
    }

    return res.status(201).json({
      totalNotification: notice.length,
      notice,
    });
  } catch (error) {
    console.log(error.message);
  }
};

///get limit 5 sorting notifications

const getNotificationByLimit = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Fetch only 5 latest notifications sorted by timestamp in descending order
    const notice = await Notification.find({ reciever: userId })
      .sort({ timestamp: -1 })
      .limit(5);



    return res.status(200).json({
      totalNotification: notice.length,
      notifications: notice,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal server error");
  }
};



//to be done later 
// const deleteNotification = async (req, res) => {
//   const notificationId = req.params.id;
//   try {
//     const deletedNotice = await Notification.findByIdAndDelete(notificationId);
//     if (!deletedNotice) {
//       return res.status(401).json("Notification not found");
//     }
//     return res.status(200).json("Succesfully deleted");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.params.userId; // Assuming userId is sent in the request params

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.type === "all") {
      // If the notification type is 'all', remove user's ID from receiver array
      if (notification.reciever.includes(userId)) {
        notification.reciever = notification.reciever.filter(
          (id) => id.toString() !== userId
        );

        await notification.save();

        return res.status(200).json("User removed from receiver list");
      } else {
        return res.status(401).json({ error: "User not authorized to delete notification" });
      }
    } else {
      // If the notification type is not 'all', normal delete operation
      const deletedNotice = await Notification.findByIdAndDelete(notificationId);
      if (!deletedNotice) {
        return res.status(404).json({ error: "Notification not found" });
      }
      return res.status(200).json("Successfully deleted");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
};




module.exports = {
  sendNotification: sendNotification,
  getNotification: getNotification,
  deleteNotification: deleteNotification,
  getNotificationByLimit: getNotificationByLimit,
};
