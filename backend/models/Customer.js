// Customer schema/model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("Customer", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    // location: { type: DataTypes.STRING, allowNull: false },
    // contact_info: { type: DataTypes.STRING },
    // image: { type: DataTypes.STRING },

}, { timestamps: true });

module.exports = Customer;
