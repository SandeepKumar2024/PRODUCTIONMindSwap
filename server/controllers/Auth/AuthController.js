const bcrypt = require("bcrypt");
const User = require("./../../models/user/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const session = require("express-session");
//For user Signup for the first time
const signupController = async (req, res) => {
  const { email, password, confirmPassword, declaration } = req.body;

  //check password and confirm
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
    declaration,
  });

  const existUser = await User.findOne({ email: email });
  if (existUser) return res.status(400).send("User already exists");
  const savedUser = await user.save();
  return res.status(200).send(savedUser);
};

//For user Login for the next time
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("User not found");

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return res.status(404).send("Email or Password wrong ");

  //create token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY
  );

  //save token in cookie

  res.cookie("token", token, { httpOnle: true });
  await user.save();

  //start the session
  req.session.user = {
    id: user._id,
    username: user.name,
    expiresAt: new Date().getTime() + 60 * 1000, // Expiry time in milliseconds (1 hour in this example)
  };

  return res.status(200).send({
    message: "Login successfully",
    user: user,
    token,
  });
};

//LOGOUT

//Middleware to check session expiration
const checkSessionExpiration = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const currentTime = new Date().getTime();
  const sessionExpirationTime = req.session.user.expiresAt;

  if (currentTime > sessionExpirationTime) {
    res.clearCookie("token");
    return res.status(401).send("Session Expired. Please log in again.");
  }

  next();
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout Successfully");
};

//FORGOT

const forgotPasswordController = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json("User not found");

    //token
    const token = await bcrypt.hash(email + Date.now().toString(), 10);
    const tokenEncode = encodeURIComponent(token);
    user.resetToken = tokenEncode;
    user.resetTime = Date.now() + 3600000;
    await user.save();
    console.log(tokenEncode);

    //send link through email

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mylearn9101@gmail.com",
        pass: "fksoibvpbgvjitym",
      },
    });

    //send mail

    await transporter.sendMail({
      to: user.email.toString(),
      html: `<p>Password reset link  here <a href=http://localhost:5173/reset/password/${token}>Click here  </a> </p>`,
      subject: "Password reset link",
    });

    res.status(200).json("Reset email is sent");
  } catch (error) {
    console.log("something went wrong with email sent", error);
  }
};

const resetPasswordController = async (req, res) => {
  const { password, confirmPassword } = req.body;

  const token = req.params.id;
  const decodeToken = encodeURIComponent(token);

  try {
    const user = await User.findOne({
      resetToken: decodeToken,
      resetTime: { $gt: Date.now() },
    });

    if (!user) return res.status(401).send("Link is expired");
    //otherwise we check password
    if (password !== confirmPassword)
      return res.status(401).send("Password must be same ");

    //if all okk then update the password

    const hashPass = await bcrypt.hash(password, 10);

    //save in the db
    user.password = hashPass;
    user.resetTime = null;
    user.resetToken = null;
    await user.save();
    return res.status(200).send("Password update succesfully");
  } catch (error) {
    console.log(error.message);
  }
};





module.exports = {
  loginController: loginController,
  signupController: signupController,
  logoutController: logoutController,
  forgotPasswordController: forgotPasswordController,
  resetPasswordController: resetPasswordController,
  checkSessionExpiration: checkSessionExpiration,
};
