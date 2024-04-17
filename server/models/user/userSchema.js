const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,

    },
    password: {
      type: String,

    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTime: {
      type: Date,
      default: null,
    },
    profilePic: {
      type: String,
      default: null,
    },
    classYear: {
      type: String,
      default: null,
    },
    course: {
      type: String,
      default: null,

    },
    currentPosition: {
      type: String,
      default: null,
    },
    extraSkills: {
      type: [String],
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    languageProficiency: {
      type: [String],
      default: null,
    },
    subjectsKnown: {
      type: [String],
      default: null,
    },
    headline: {
      type: String,
      default: null,
    },
    talksAbout: {
      type: [String],
      default: null,
    },
    dob: {
      type: String,
      default: null,
    },
    institute: {
      type: String,
      default: null,
    },
    lastSeen: {
      type: Date,
    },
    respondent: {
      type: Boolean,
      default: false
    },
    declaration: {
      type: Boolean


    },
    profileBanner: {
      type: String,
      default: null
    },
    googleId: {
      type: String,
      default: null
    },
    isAdmin:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userSignup", userSchema);
