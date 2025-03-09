const express = require("express");
const { signup, login, logout, getCurrentUser } = require("../controllers/authController");
const { protectRoute, verifyToken } = require("../middleware/authMiddleware");
const { signup: restaurantSignup, login: restaurantLogin, getRestaurantDetails, getCurrentRestaurant } = require("../controllers/restaurantController");
const { addDish } = require("../controllers/dishController");

const router = express.Router();

// Customer Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser); // Check if logged in

// Restaurant Authentication
router.post("/restaurant-signup", restaurantSignup);
router.post("/restaurant-login", restaurantLogin);
router.get("/:id", getRestaurantDetails);

// Dish routes
router.post("/", verifyToken, addDish); // ✅ Access `addDish` correctly

// Protected route example
// router.get("/protected", protectRoute, (req, res) => {
//   res.json({ message: "You are authorized", user: req.session.user });
// });

module.exports = router;

// router.post("/restaurant-logout", restaurantLogout);
// router.get("/restaurants", getRestaurants); // Fetch all restaurants
router.get("restaurants/me", verifyToken, getCurrentRestaurant); // Get logged-in restaurant profile
// router.get("/restaurant/:id", getRestaurantDetails); // Get restaurant details by ID