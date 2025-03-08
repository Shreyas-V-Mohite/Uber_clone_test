// Order processing
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");

// 📌 Place an Order
exports.placeOrder = async (req, res) => {
    try {
        const { restaurant_id, items, total_price } = req.body;
        const customer_id = req.user.id; // Retrieved from `verifyToken`

        // Validate Data
        if (!restaurant_id || !items || !total_price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const order = await Order.create({ customer_id, restaurant_id, items, total_price });
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};

// 📌 Get Customer's Orders
exports.getCustomerOrders = async (req, res) => {
    try {
        const customer_id = req.user.id; // Retrieved from `verifyToken`
        const orders = await Order.findAll({ where: { customer_id }, include: Restaurant });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// 📌 Get Orders for a Restaurant (For Restaurant Owners)
exports.getRestaurantOrders = async (req, res) => {
    try {
        const { restaurant_id } = req.params;
        const orders = await Order.findAll({ where: { restaurant_id }, include: Customer });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// 📌 Update Order Status (For Restaurants)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(order_id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
};
