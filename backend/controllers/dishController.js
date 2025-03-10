const Dish = require("../models/Dish");
const { uploadToMinio } = require("../utils/minioClient");
const multer = require('multer');
const upload = multer();

console.log("Dish Controller Loaded"); // Debugging line
console.log("Dish Model:", Dish); // Check model import

const addDish = async (req, res) => {
    console.log("in addDish");
    try {
        const body = JSON.parse(req.body.data);
        console.log("body json", body);
        const { name, description, price, category, restaurant_id } = body;
        const files = req.files;
        console.log("user role", req.body, req.user.role);
        console.log("body", req.user.id, restaurant_id);
        // Check if the restaurant_id in the token matches the restaurant_id in the request body
        if (req.user.role != "restaurant" || req.user.id != restaurant_id) {
            return res.status(403).json({ message: "Unauthorized to add dish to this restaurant" });
        }

        let imageKeys = [];
        if (files && files.length > 0) {
            imageKeys = await Promise.all(files.map(file => uploadToMinio(file)));
        }
        // images = imageKeys.join(',')

        const dish = await Dish.create({ name, description, price, category, restaurant_id, images: imageKeys.join(',')  });
        res.status(201).json({ message: "Dish added successfully", dish });
    } catch (error) {
        console.error("Error in addDish:", error); // Debugging
        res.status(500).json({ message: "Error adding dish", error });
    }
};

const getDishesByRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.params;
        const dishes = await Dish.findAll({ where: { restaurant_id } });
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dishes", error });
    }
};

const getDishById = async (req, res) => {
    try {
        const { dish_id } = req.params;
        const dish = await Dish.findByPk(dish_id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dish", error });
    }
};

const deleteDish = async (req, res) => {
    try {
        const { dish_id } = req.params;

        // Find the dish to get its restaurant_id
        const dish = await Dish.findOne({ where: { id: dish_id } });
        if (!dish) return res.status(404).json({ message: "Dish not found" });

// Check if the restaurant_id in the token matches the restaurant_id of the dish
        if (req.user.role !== "restaurant" || req.user.id !== dish.restaurant_id) {
            return res.status(403).json({ message: "Unauthorized to delete this dish" });
        }

        const deleted = await Dish.destroy({ where: { id: dish_id } });
        if (!deleted) return res.status(404).json({ message: "Dish not found" });
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting dish", error });
    }
};

const updateDish = async (req, res) => {
    try {
        const { dish_id } = req.params;
        const { name, description, price, category } = req.body;
        const files = req.files;

        const dish = await Dish.findByPk(dish_id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });

        // Check if the restaurant_id in the token matches the restaurant_id of the dish
        if (req.user.role !== "restaurant" || req.user.id !== dish.restaurant_id) {
            return res.status(403).json({ message: "Unauthorized to update this dish" });
        }

        let imageKeys = dish.images ? dish.images.split(',') : [];
        if (files && files.length > 0) {
            const newImageKeys = await Promise.all(files.map(file => uploadToMinio(file)));
            imageKeys = imageKeys.concat(newImageKeys);
        }

        await dish.update({ name, description, price, category, images: imageKeys.join(',') });
        res.status(200).json({ message: "Dish updated successfully", dish });
    } catch (error) {
        res.status(500).json({ message: "Error updating dish", error });
    }
};

// Correct Export
module.exports = {
    addDish,
    updateDish,
    getDishesByRestaurant,
    getDishById,
    deleteDish,
};

console.log("Functions in dishController:", module.exports); // Log available functions
