const express = require("express");
const { signup, login, logout, getCurrentRestaurant, getRestaurantDetails, getAllRestaurants } = require("../controllers/restaurantController"); // Ensure this path is correct
const router = express.Router();

router.post("/restaurant-signup", signup);
router.post("/restaurant-login", login);
router.post("/restaurant-logout", logout);``
router.get("/me", getCurrentRestaurant); // Get logged-in restaurant profile
router.get("/:id", getRestaurantDetails);

router.get("/", getAllRestaurants);
module.exports = router;
