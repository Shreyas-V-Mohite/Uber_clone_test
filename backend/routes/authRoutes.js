const express = require("express");
const { signup, login, logout, getCurrentUser } = require("../controllers/authController");
const { protectRoute, verifyToken } = require("../middleware/authMiddleware");
const { signup: restaurantSignup, login: restaurantLogin, getRestaurantDetails, getCurrentRestaurant } = require("../controllers/restaurantController");
const { addDish } = require("../controllers/dishController");
const  Customer  = require("../models/Customer");

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

router.get("/:email", async (req, res) => {
  try {
    const customer = await Customer.findOne({ where: { email: req.params.email } });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:email", async (req, res) => {
  try {
    console.log("req.body", req.body);
    
    const { name, dob, city, state, country, phone, profilePicture } = req.body;
    const customer = await Customer.findOne({ where: { email: req.params.email } });;
    console.log("customer", customer);
    
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.update({ name, dob, city, state, country, phone, profilePicture });
    res.json({ message: "Profile updated successfully", customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

// router.post("/restaurant-logout", restaurantLogout);
// router.get("/restaurants", getRestaurants); // Fetch all restaurants
router.get("restaurants/me", verifyToken, getCurrentRestaurant); // Get logged-in restaurant profile
// router.get("/restaurant/:id", getRestaurantDetails); // Get restaurant details by ID