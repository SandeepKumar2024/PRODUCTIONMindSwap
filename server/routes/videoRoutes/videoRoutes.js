const express = require('express');
const { createRoom, joinRoom, setPeerId, getPeerId, getUserInfo } = require('../../controllers/videoController/videoController');

const router = express.Router();

router.post('/create-room', createRoom)
router.get('/join-room/:roomId', joinRoom)
router.post('/create-peer/:roomId', setPeerId)
router.get('/get-peer/:roomId', getPeerId)
router.get('/get-user-info/:roomId', getUserInfo)


module.exports = router;