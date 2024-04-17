const User = require("../../models/user/userSchema");
const mongoose = require("mongoose");

// for website search bar
const searchController = async (req, res) => {
  //search any thing from user

  const query = req.query.q || req.query.id
  try {
    const info = await User.find({
      respondent: true,
      $or: [
        { talksAbout: { $regex: query, $options: "i" } },
        { languageProficiency: { $regex: query, $options: "i" } },
        { subjectsKnown: { $regex: query, $options: "i" } },
        { headline: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { course: { $regex: query, $options: "i" } },
        { currentPosition: { $regex: query, $options: "i" } },
        { institute: { $regex: query, $options: "i" } },
        { classYear: { $regex: query, $options: "i" } },
        { extraSkills: { $regex: query, $options: "i" } },
        { talksAbout: { $regex: query, $options: "i" } },

      ],
    });
    res.send({
      total: info.length,
      info: info
    });
  } catch (err) {
    console.log(err);
  }
};

//for ADMIN search bar
const searchControllerAdmin = async (req, res) => {
  // Search anything from user
  const query = req.query.id;

  try {
    let info;

    if (query.toLowerCase() === "all") {
      // If query is "all", retrieve all users
      info = await User.find({});
    } else {
      // If query is an ID, search for that specific user
      if (mongoose.Types.ObjectId.isValid(query)) {

        info = await User.findById(query);
      } else {
        // If query is not a valid ID, perform regular search across multiple fields
        info = await User.find({
          $or: [
            { talksAbout: { $regex: new RegExp(query, "i") } },
            { languageProficiency: { $regex: new RegExp(query, "i") } },
            { subjectsKnown: { $regex: new RegExp(query, "i") } },
            { headline: { $regex: new RegExp(query, "i") } },
            { name: { $regex: new RegExp(query, "i") } },
            { course: { $regex: new RegExp(query, "i") } },
            { currentPosition: { $regex: new RegExp(query, "i") } },
            { institute: { $regex: new RegExp(query, "i") } },
            { classYear: { $regex: new RegExp(query, "i") } },
            { extraSkills: { $regex: new RegExp(query, "i") } },
           
          ]
        });
      }
    }

    res.send(info);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};


const filterController = async (req, res) => {
  //search any thing from user

  const query = req.query.q;
  try {
    const info = await User.find({
      $or: [
        { talksabout: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } },
        { subjectKnown: { $regex: query, $options: "i" } },
        { heading: { $regex: query, $options: "i" } },
      ],
    });
    res.send(info);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { searchController: searchController, searchControllerAdmin: searchControllerAdmin };
