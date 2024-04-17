const bcrypt = require("bcrypt");
const User = require("./../../models/user/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Favourite = require("../../models/favourite/favourite");
const mongoose = require("mongoose");
//
const updateProfile = async (req, res) => {
  const id = req.params.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );

    if (!updatedUser) return res.send("User is not found");

    return res.status(200).json({
      message: "Succesfully updated ",
      userData: updatedUser
    });
  } catch (error) {
    console.log(error.meassge);
  }
};

//add favourite
const addFavouriteController = async (req, res) => {
  const { userId, favId } = req.body;

  try {

    const favourite = await Favourite.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { favId: favId } },
      { upsert: true, new: true }
    );

    return res.status(200).send({ message: "Added succesfully", favourite });
  } catch (error) {
    console.log(error);
  }
};


//delete favourite
const deleteFavourite = async (req, res) => {
  try {
    const { userId, favId } = req.body;

    const userFavourites = await Favourite.findOne({ userId: userId, favId: favId });
    if (!userFavourites) {
      return res.status(404).json({ error: 'Favorites not found' });
    }
    // Remove the specified favIdToDelete from the favId array
    userFavourites.favId = userFavourites.favId.filter(id => id !== favId);
    // Save the updated document
    await userFavourites.save();
    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//check fav status 
// Assuming you're using Express.js
const checkFavStatus = async (req, res) => {
  try {
    const { favId, userId } = req.params;
    const userFavourites = await Favourite.findOne({ userId: userId, favId: favId });
    if (!userFavourites) {
      // If no favorites found for this user, return false
      return res.status(200).json({ isFavourite: false });
    }
    // If the user's favorites contain the userId, return true
    const isFavourite = userFavourites.favId.includes(favId);
    res.status(200).json({ isFavourite });
  } catch (error) {
    console.error('Error checking favourite status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get all favorites
const getFavoritesByLimit = async (req, res) => {
  const { userId } = req.params;
  try {

    const userFavourites = await Favourite.findOne({ userId: userId });

    if (!userFavourites) {
      return res.status(404).json({ error: 'Favorites not found' });
    }
    // Extract the first 5 favorite IDs
    const limitedFavorites = userFavourites.favId.slice(0, 5);

    return res.status(200).json({
      total: limitedFavorites.length,
      favourites: limitedFavorites
    });


  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal server error");
  }
};
const getAllFavorites = async (req, res) => {
  const { userId } = req.params;
  try {

    const userFavourites = await Favourite.findOne({ userId: userId });

    if (!userFavourites) {
      return res.status(404).json({ error: 'Favorites not found' });
    }
    return res.status(200).json({
      total: userFavourites.favId.length,
      favourites: userFavourites.favId
    });


  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal server error");
  }
};
const getAllFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find all documents where the specified user is favorited
    const usersWhoFavorited = await Favourite.find({ favId: userId });


    // Initialize an empty array to store follower user IDs
    const followers = [];

    // Iterate through each document to find followers
    usersWhoFavorited.forEach(userFavourite => {
      // If the user is favorited by others, add their user ID to followers array
      followers.push(userFavourite.userId);
    });

    return res.status(200).json({
      totalFollowers: followers.length,
      followers: followers
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal server error");
  }
};




//get logged user data

const getLoggedUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid user ID");
  }


  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).send("User not found");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};



//get all users 

const getAllUsersRandom = async (req, res) => {
  try {
    const randomUsers = await User.aggregate([
      { $match: { respondent: true } }, // Filter respondents
      { $sample: { size: 10 } } // Sample 10 random users
    ]);

    return res.status(200).json(randomUsers);

  } catch (error) {
    return res.status(404).json("Not found")
  }

}


//GET aALL USERS FROM DB

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      totalUsers: users.length,
      users: users
    });

  } catch (error) {
    return res.status(404).json("Not found")
  }

}


//delete specific user from ADMIN PORTAL 

const deleteUserbyAdmin = async (req, res) => {
  const id = req.params.id;
  
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).send("User not found");

    return res.status(200).send("User deleted");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  updateProfile: updateProfile,
  addFavouriteController: addFavouriteController,
  getLoggedUser: getLoggedUser,
  getAllUsersRandom: getAllUsersRandom,
  deleteFavourite: deleteFavourite,
  checkFavStatus: checkFavStatus,
  getFavoritesByLimit: getFavoritesByLimit,
  getAllFavorites: getAllFavorites,
  getAllFollowers: getAllFollowers,
  getAllUsers:getAllUsers,
  deleteUserbyAdmin:deleteUserbyAdmin
};
