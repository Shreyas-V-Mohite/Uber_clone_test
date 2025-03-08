const Dish = require("../models/Dish");

console.log("Dish Controller Loaded"); // Debugging line
console.log("Dish Model:", Dish); // Check model import

const addDish = async (req, res) => {
    console.log("in addDish");
    try {
        const { name, description, price, category, image, restaurant_id } = req.body;
        const dish = await Dish.create({ name, description, price, category, image, restaurant_id });
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

const deleteDish = async (req, res) => {
    try {
        const { dish_id } = req.params;
        const deleted = await Dish.destroy({ where: { id: dish_id } });
        if (!deleted) return res.status(404).json({ message: "Dish not found" });
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting dish", error });
    }
};

// Correct Export
module.exports = {
    addDish,
    getDishesByRestaurant,
    deleteDish,
};

console.log("Functions in dishController:", module.exports); // Log available functions
