// filepath: /home/shreyas/Documents/sem2/Distributed_systems/labs/Labs/lab1/backend/models/Dish.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./Restaurant");

const Dish = sequelize.define("Dish", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING }, // e.g., Appetizer, Main Course
    image: { type: DataTypes.STRING }, // URL to image
    restaurant_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Restaurant, key: "id" },
        onDelete: "CASCADE"
    }
}, { timestamps: false });

Restaurant.hasMany(Dish, { foreignKey: "restaurant_id", onDelete: "CASCADE" });
Dish.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

module.exports = Dish;
