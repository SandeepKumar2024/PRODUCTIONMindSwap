const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth/authRoute");
const profileRouter = require("./routes/profile/profileRoutes");
const uploadRouter = require("./routes/fileUpload/uploadFile");
const searchFilterRouter = require("./routes/searchFilter/searchFilterRouter");
const chatRoutes = require("./routes/chat/chatRoutes");
const messageRoutes = require("./routes/chat/messageRoutes");
const heartRoutes = require("./routes/hearbeat/heartRoutes");
const notificationRoute = require("./routes/notification/notificationRoute");
const requestRouter = require("./routes/request/requestRoutes");
const videoRoutes = require("./routes/videoRoutes/videoRoutes");
const feedbackRoutes = require("./routes/feedback/feedbackRoute");
const reportRoutes = require("./routes/reportAbuse/reportRoute");
const reportProblemRoutes = require("./routes/reportProblem/reportProblemRoute");
const historyRoutes = require("./routes/history/historyRoutes");
const analyticsRoutes = require("./routes/userAnalytics/userAnalyticsRoutes");
const dailyUserRoutes = require("./routes/dashboard/dashboardRoute");
const session = require("express-session");
const path = require("path");
const User = require('./models/user/userSchema');
const sharp = require('sharp');
const { checkSessionExpiration } = require("./controllers/Auth/AuthController");
dotenv.config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const http = require("http");
const { Server } = require("socket.io");
// Create HTTP server
const server = http.createServer(app);
// ---------------------Socket Starts------------------------
// Set up socket.io
const io = new Server(server, {
  cors: {
    origin: "*",  
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  //white board logic
  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data);
  })

  //send request using db
  socket.on("send-request-db", async (data) => {
    const { reciever } = data;
    const user = activeUsers.find((user) => user.userId === reciever);
    if (user) {
      io.to(user.socketId).emit("incoming-requests-db", data);
    }
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log("Sending from socket to :", recieverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
});
// ---------------------Socket Starts------------------------

// session middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(
  session({
    secret: process.env.SEC_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("New Feature Unckocked");
});

app.use("/api", (req, res) => {
  res.send("Hello World! from Adangiri");
})
app.use("/auth", authRouter);
app.use("/user", profileRouter);
app.use("/", searchFilterRouter);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/", heartRoutes);
app.use("/", notificationRoute);
app.use("/", requestRouter);
app.use("/", videoRoutes);
app.use("/", feedbackRoutes);
app.use("/", reportRoutes);
app.use("/", reportProblemRoutes);
app.use("/", historyRoutes);
app.use("/", analyticsRoutes);
app.use("/", dailyUserRoutes);
app.use("/public", express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// image uploading
const fs = require('fs');
const passport = require("passport");
const storage = multer.diskStorage({
  destination: "public/upload",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueName + fileExtension);
  },
});

const upload = multer({ storage: storage });

app.post("/upload/:userId", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(404).json("Image is not found");
  }
  try {
    const compressedImageBuffer = await sharp(req.file.path)
      .resize({ width: 300 })
      .png({ quality: 5, compressionLevel: 9 })
      .toBuffer();

    const compressedImagePath = `public/upload/compressed-${Date.now()}.png`;
    await sharp(compressedImageBuffer).toFile(compressedImagePath);

    const imagePath = compressedImagePath.replace(/\\/g, '/');

    const { userId } = req.params;
    await User.findByIdAndUpdate({ _id: userId }, { profilePic: imagePath });
    return res.status(200).json({
      message: "Image uploaded successfully",
      imagePath,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/upload/banner/:userId", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(404).json("Image is not found");
  }
  try {
    const compressedImageBuffer = await sharp(req.file.path)
      .resize({ width: 1170 })
      .png({ quality: 10, compressionLevel: 9 })
      .toBuffer();

    const compressedImagePath = `public/upload/compressed-${Date.now()}.png`;
    await sharp(compressedImageBuffer).toFile(compressedImagePath);

    const imagePath = compressedImagePath.replace(/\\/g, '/');

    const { userId } = req.params;
    await User.findByIdAndUpdate({ _id: userId }, { profileBanner: imagePath });
    return res.status(200).json({
      message: "Image uploaded successfully",
      imagePath,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GOOGLE AUTH API
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID:   process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
  callbackURL: 'http://localhost:8200/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const userByEmail = await User.findOne({ email: profile.emails[0].value });

      if (userByEmail) {
        userByEmail.googleId = profile.id;
        await userByEmail.save();
        return done(null, userByEmail);
      }

      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });

      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if (req.user && req.user._id) {
      const userId = req.user._id.toString();
      const googleId = req.user.googleId.toString();
      if (googleId) {
        // Set the cookie with the Google ID
        res.cookie('googleId', googleId, { httpOnly: true });
        res.redirect(`${process.env.REACT_APP_URI}/loading?cwg=${userId}`);
      }
    } else {
      console.error("No user or user ID found.");
    }
    res.redirect(`${process.env.REACT_APP_URI}/main`);
  }
);

const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log("Server running on port",`${PORT}`);
});
