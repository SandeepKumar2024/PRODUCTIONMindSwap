const jwt = require('jsonwebtoken');
const Room = require('../../models/videoModel/roomModel')
const bcrypt = require('bcrypt')

//create room id for video call 

const createRoom = async (req, res) => {

    //craete jwt token containing both sender and receiver id

    // Sign the JWT token with a secret key
    const token = jwt.sign({
        sender: req.body.sender,
        reciever: req.body.reciever
    }, process.env.JWT_KEY);

    // Base64 encode the token and remove non-alphanumeric characters
    const roomId = Buffer.from(token).toString('base64').replace(/[^a-zA-Z0-9]/g, '');




    const newRoom = new Room({
        token: token,
        roomId: roomId,

    })

    await newRoom.save();

    return res.status(200).json(newRoom);
    console.log("hello")

}

const joinRoom = async (req, res) => {

    //verify roomID FETCH FROM db and check sender and receiver
    const roomId = req.params.roomId;
    const room = await Room.findOne({ roomId: roomId });
    if (!room) return res.status(404).json("Room not found");


    // verify the sender and reciver using jwt.verify
    let decoded;
    try {
        decoded = jwt.verify(room?.token, process.env.JWT_KEY);
    } catch (error) {
        return res.status(401).json("Invalid token");
    }
    const { sender } = decoded;
    //check if sender and reciever are same with the original sender and reciver then grant access
    if (sender != req.body.sender) {
        return res.status(401).json("Access Denied");
    }

    return res.status(200).json("Access granted");

}

//for fetching user information in video call page
const getUserInfo = async (req, res) => {

    //verify roomID FETCH FROM db and check sender and receiver
    const roomId = req.params.roomId;
    const room = await Room.findOne({ roomId: roomId });
    if (!room) return res.status(404).json("Room not found");


    // verify the sender and reciver using jwt.verify
    let decoded;
    try {
        decoded = jwt.verify(room?.token, process.env.JWT_KEY);
    } catch (error) {
        return res.status(401).json("Invalid token");
    }
    const { sender, reciever } = decoded;
    //check if sender and reciever are same with the original sender and reciver then grant access
    return res.status(200).json({ sender, reciever });

}

const setPeerId = async (req, res) => {
    const roomId = req.params.roomId;
    const peerId = req.body.peerId;

    try {
        const result = await Room.findOne({ roomId: roomId });

        if (result.peerId === null) {
            await Room.findOneAndUpdate({ roomId: roomId }, { $set: { peerId: peerId } }, { new: true })
            return res.status(200).json("updated successfully");
        } else {
            return res.status(401).json("Peer Id already set");
        }

    } catch (error) {
        return res.status(401).json(error.message);

    }
}

const getPeerId = async (req, res) => {
    const roomId = req.params.roomId;
    const peerId = await Room.findOne({ roomId: roomId });
    if (!peerId) return res.status(404).json("Room not found");
    return res.status(200).json(peerId);
}










module.exports = {
    createRoom,
    joinRoom, setPeerId,
    getPeerId,
    getUserInfo



}