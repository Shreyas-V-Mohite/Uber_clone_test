const express = require("express");
const { signup, login, logout, getCurrentRestaurant } = require("../controllers/restaurantController"); // Ensure this path is correct
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentRestaurant); // Get logged-in restaurant profile

module.exports = router;
