// heartbeatRoute.js

const express = require('express');
const router = express.Router();
const { handleHeartbeat } = require('./../../controllers/hearbeat/hearbeatControler');

// Define the route for heartbeat requests
router.post('/heartbeat', handleHeartbeat);

module.exports = router;
