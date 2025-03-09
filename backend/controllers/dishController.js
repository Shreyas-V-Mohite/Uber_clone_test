const Dish = require("../models/Dish");

console.log("Dish Controller Loaded"); // Debugging line
console.log("Dish Model:", Dish); // Check model import

const addDish = async (req, res) => {
    console.log("in addDish");
    try {
        const { name, description, price, category, image, restaurant_id } = req.body;

        // Check if the restaurant_id in the token matches the restaurant_id in the request body
        if (req.user.role !== "restaurant" || req.user.id !== restaurant_id) {
            return res.status(403).json({ message: "Unauthorized to add dish to this restaurant" });
        }

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

// Correct Export
module.exports = {
    addDish,
    getDishesByRestaurant,
    deleteDish,
};

console.log("Functions in dishController:", module.exports); // Log available functions
