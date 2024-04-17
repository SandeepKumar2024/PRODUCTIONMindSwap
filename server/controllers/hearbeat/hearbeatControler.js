const User = require("../../models/user/userSchema");

const handleHeartbeat = async (req, res) => {
  // Update the user's last seen timestamp or perform other actions

  const userId = req.body.id;

  await User.findByIdAndUpdate(userId, { lastSeen: Date.now() });
  
  // console.log("Heartbeat received from client");
  res.sendStatus(200); // Send a success response to the client
};

module.exports = {
  handleHeartbeat, // Export the controller function
};
