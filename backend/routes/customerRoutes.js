const express = require("express");
const customerController = require("../controllers/customerController");
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require('multer');
const upload = multer();

const router = express.Router();

// router.post("/", verifyToken, upload.array('images'), customerController.addCustomer);
router.put("/:customer_id", verifyToken, upload.array('images'), customerController.updateCustomer);

module.exports = router;