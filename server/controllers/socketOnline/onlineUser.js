// Import required modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Example user IDs (replace with actual user IDs)
const userIds = ['user1', 'user2', 'user3'];
const onlineUsers = new Set();

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user-online', (userId) => {
        onlineUsers.add(userId);
        console.log(`User with ID ${userId} is now online`);
    });

    socket.on('user-offline', (userId) => {
        onlineUsers.delete(userId);
        console.log(`User with ID ${userId} is now offline`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Handle user going offline on disconnect
        // (This is optional, as some disconnects may be due to other reasons)
        // Here you would emit 'user-offline' event and remove the user from onlineUsers set
    });
});

// API endpoint to get user status
app.get('/api/user-status/:userId', (req, res) => {
    const userId = req.params.userId;
    const isOnline = onlineUsers.has(userId);
    res.json({ userId, isOnline });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
