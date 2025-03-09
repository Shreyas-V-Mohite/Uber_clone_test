// Order placement & tracking
const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Place an Order (Customer)
router.post("/", verifyToken, orderController.placeOrder);

// 📌 Get Customer's Orders
router.get("/customer", verifyToken, orderController.getCustomerOrders);

// 📌 Get Orders for a Restaurant (Only Owners)
router.get("/restaurant/:restaurant_id", verifyToken, orderController.getRestaurantOrders);

// 📌 Update Order Status (Restaurant Owner)
router.put("/status/:order_id", verifyToken, orderController.updateOrderStatus);

// 📌 Cancel Order (Customer)
router.put("/cancel/:order_id", verifyToken, orderController.cancelOrder);

module.exports = router;
