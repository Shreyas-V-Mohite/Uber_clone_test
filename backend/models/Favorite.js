const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorite = sequelize.define("Favorite", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: true });

// ✅ Import models AFTER defining to prevent cyclic dependency issues
const Restaurant = require("./Restaurant");

// ✅ Create association between Favorite and Restaurant
Favorite.belongsTo(Restaurant, { foreignKey: "restaurantId", onDelete: "CASCADE" });
Restaurant.hasMany(Favorite, { foreignKey: "restaurantId", onDelete: "CASCADE" });

module.exports = Favorite;
