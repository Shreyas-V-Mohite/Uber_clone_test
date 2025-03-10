const express = require("express");
const { toggleFavorite, getFavorites } = require("../controllers/favoriteController");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/toggle", protectRoute, toggleFavorite);
router.get("/", protectRoute, getFavorites);

module.exports = router;
