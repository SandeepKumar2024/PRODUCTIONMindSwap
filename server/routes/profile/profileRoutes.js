const express = require("express");
const {
  addFavouriteController,
  updateProfile,
  getLoggedUser,
  getAllUsersRandom,
  deleteFavourite,
  checkFavStatus,
  getFavoritesByLimit,
  getAllFavorites,
  getAllFollowers,
  getAllUsers,
  deleteUserbyAdmin,
} = require("../../controllers/Profile/profileController");
const { verifyUserToken } = require("../../controllers/proctedRoute/protectedRoute");
const router = express.Router();

router.post("/update/:userId", updateProfile);
router.get("/get/:id", getLoggedUser);
router.post("/favourite/add", addFavouriteController);
router.delete("/favourite/delete", deleteFavourite);
router.delete("/delete/byAdmin/:id", deleteUserbyAdmin);
router.get("/favourite/status/:userId/:favId", checkFavStatus);
router.get("/favourite/:userId", getFavoritesByLimit);
router.get("/favourite/all/:userId", getAllFavorites);
router.get("/followers/:userId", getAllFollowers);
router.get("/get-all-users/random", getAllUsersRandom)
router.get("/all",getAllUsers);

module.exports = router;
