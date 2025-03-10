const express = require("express");
const dishController = require("../controllers/dishController");
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post("/", verifyToken, upload.array('images'), dishController.addDish);
router.put("/dish/:dish_id", verifyToken, upload.array('images'), dishController.updateDish);
router.get("/:restaurant_id", dishController.getDishesByRestaurant);
router.get("/dish/:dish_id", dishController.getDishById);
router.delete("/:dish_id", verifyToken, dishController.deleteDish);

module.exports = router;
