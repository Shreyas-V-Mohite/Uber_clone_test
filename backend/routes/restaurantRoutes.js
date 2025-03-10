const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.post("/restaurant-signup", restaurantController.signup);
router.post("/restaurant-login", restaurantController.login);
router.post("/restaurant-logout", restaurantController.logout);
router.get("/me", restaurantController.getCurrentRestaurant); // Get logged-in restaurant profile

// for restaurant and dashboard -- to be verified
router.get("/:id", restaurantController.getRestaurantDetails);

// for customer dashboard
router.get("/", restaurantController.getAllRestaurants);

// router.post("/", verifyToken, upload.array('images'), restaurantController.addRestaurant);
router.put("/update/:restaurant_id", verifyToken, upload.array('images'), restaurantController.updateRestaurant);

module.exports = router;
