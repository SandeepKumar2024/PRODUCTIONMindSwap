const express = require("express");
const { searchController, searchControllerAdmin } = require("../../controllers/search/Search");



const router = express.Router();

router.get(`/search`, searchController);
router.get(`/search/admin`, searchControllerAdmin);




module.exports = router;
