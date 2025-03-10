const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const { uploadToMinio } = require("../utils/minioClient");
const multer = require('multer');
const upload = multer();

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
            return res.status(400).json({ message: "Invalid email or password for Restaurant" });
        }

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password for Restaurant" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: restaurant.id, email: restaurant.email, role: "restaurant" },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Restaurant Login successful",
            token, // Include the token in the response
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                email: restaurant.email,
                location: restaurant.location
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get Restaurant by ID
exports.getRestaurantDetails = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant details", error });
    }
};

// Get Current Restaurant
exports.getCurrentRestaurant = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        const restaurant = await Restaurant.findByPk(decoded.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ restaurant });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", error });
    }
};

// Get All Restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error });
    }
};

// Logout Restaurant
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out of Restaurant" });
        }
        res.status(200).json({ message: "Logout successful from Restaurant" });
    });
};

// Update Restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.params;
        const { name, email, password, location, description, contact_info, timings } = req.body;
        const files = req.files;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        let imageKeys = restaurant.images ? restaurant.images.split(',') : [];
        if (files && files.length > 0) {
            const newImageKeys = await Promise.all(files.map(file => uploadToMinio(file)));
            imageKeys = imageKeys.concat(newImageKeys);
        }

        await restaurant.update({ name, email, password, location, description, contact_info, timings, images: imageKeys.join(',') });
        res.status(200).json({ message: "Restaurant updated successfully", restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error updating restaurant", error });
    }
};
