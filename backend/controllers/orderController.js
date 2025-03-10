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
            console.log("Missing required fields", req.body);
            return res.status(400).json({ message: "Missing required fields" });
        }

        const order = await Order.create({ customer_id, restaurant_id, items, total_price, status: "Pending" });
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

        // Check if the restaurant_id in the token matches the restaurant_id of the order
        if (req.user.role !== "restaurant" || req.user.id !== order.restaurant_id) {
            return res.status(403).json({ message: "Unauthorized to update this order" });
        }

        // Prevent updating the status if the order is canceled
        if (order.status === "Cancelled") {
            return res.status(400).json({ message: "Cannot update a canceled order" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
};

// 📌 Cancel Order (For Customers)
exports.cancelOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        const order = await Order.findByPk(order_id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Check if the customer_id in the token matches the customer_id of the order
        if (req.user.role !== "customer" || req.user.id !== order.customer_id) {
            return res.status(403).json({ message: "Unauthorized to cancel this order" });
        }

        // Allow cancellation only if the order status is Pending, Accepted, or Preparing
        if (["Pending", "Accepted", "Preparing"].includes(order.status)) {
            order.status = "Cancelled";
            await order.save();
            return res.status(200).json({ message: "Order canceled successfully", order });
        } else {
            return res.status(400).json({ message: "Order cannot be canceled at this stage" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error canceling order", error });
    }
};
