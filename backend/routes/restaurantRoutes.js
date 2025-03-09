const express = require("express");
const { signup, login, logout, getCurrentRestaurant, getRestaurantDetails, getAllRestaurants } = require("../controllers/restaurantController");
const router = express.Router();

router.post("/restaurant-signup", signup);
router.post("/restaurant-login", login);
router.post("/restaurant-logout", logout);``
router.get("/me", getCurrentRestaurant); // Get logged-in restaurant profile


// for restaurant and dashboard -- to be verified
router.get("/:id", getRestaurantDetails);

// for customer dashboard
router.get("/", getAllRestaurants);


module.exports = router;
