const Favorite = require("../models/Favorite");
const Restaurant = require("../models/Restaurant");

exports.toggleFavorite = async (req, res) => {
    const { restaurantId } = req.body;
    const customerId = req.user.id; // Extract customer ID from session

    try {
        // ✅ Check if restaurant is already favorited
        const existingFavorite = await Favorite.findOne({ where: { customerId, restaurantId } });

        if (existingFavorite) {
            // ✅ If exists, remove it (unfavorite)
            await existingFavorite.destroy();
            return res.status(200).json({ message: "Removed from favorites" });
        } else {
            // ✅ If not, add it to favorites
            await Favorite.create({ customerId, restaurantId });
            return res.status(201).json({ message: "Added to favorites" });
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
        res.status(500).json({ message: "Failed to toggle favorite", error });
    }
};

// ✅ Get All Favorite Restaurants of a Customer
exports.getFavorites = async (req, res) => {
    console.log("in getFav")
    const customerId = req.user.id;

    try {
        const favorites = await Favorite.findAll({
            where: { customerId },
            include: [{ model: Restaurant }]
        });
        console.log(favorites);
        res.status(200).json(favorites.map(fav => fav.Restaurant));
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "Failed to get favorites", error });
    }
};
