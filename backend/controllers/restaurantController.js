const bcrypt = require("bcryptjs");
const Restaurant = require("../models/Restaurant");

// Restaurant Signup
exports.signup = async (req, res) => {
    const { name, email, password, location, description, contact_info, timings } = req.body;

    try {
        const existingRestaurant = await Restaurant.findOne({ where: { email } });
        if (existingRestaurant) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newRestaurant = await Restaurant.create({
            name, email, password: hashedPassword, location, description, contact_info, timings
        });

        res.status(201).json({ message: "Restaurant registered successfully", restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Restaurant Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const restaurant = await Restaurant.findOne({ where: { email } });
        if (!restaurant) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        req.session.restaurant = { id: restaurant.id, name: restaurant.name, email: restaurant.email, location: restaurant.location };
        res.status(200).json({ message: "Login successful", restaurant: req.session.restaurant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get Current Restaurant
exports.getCurrentRestaurant = (req, res) => {
    if (req.session.restaurant) {
        res.json({ restaurant: req.session.restaurant });
    } else {
        res.status(401).json({ message: "Not logged in" });
    }
};

// Logout Restaurant
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
};
