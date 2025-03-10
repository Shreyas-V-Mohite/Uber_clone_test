const express = require("express");
const dishController = require("../controllers/dishController"); // ✅ Import the entire controller object
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

console.log("Dish Controller in Routes:", Object.keys(dishController)); // ✅ Debugging

router.post("/", verifyToken, dishController.addDish); // ✅ Access `addDish` correctly
router.get("/:restaurant_id", dishController.getDishesByRestaurant);
router.get("/dish/:dish_id", dishController.getDishById); // Add route to get dish by ID
router.delete("/:dish_id", verifyToken, dishController.deleteDish);

module.exports = router;
