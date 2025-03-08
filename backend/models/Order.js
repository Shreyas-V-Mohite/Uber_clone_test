// Order schema/model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./Customer");
const Restaurant = require("./Restaurant");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Customer, key: "id" }
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Restaurant, key: "id" }
    },
    items: {
        type: DataTypes.JSON, // Stores items as an array of objects [{ dish_id: 1, quantity: 2 }, { dish_id: 3, quantity: 1 }]
        allowNull: false
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"),
        defaultValue: "Pending"
    }
}, {
    timestamps: true
});

// Relationships
Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

module.exports = Order;
