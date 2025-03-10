

// module.exports = Customer;
'use strict';
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Ensure your DB config is correct

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true, // Ensures createdAt and updatedAt fields
});

module.exports = Customer;









// // module.exports = Customer;
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
// const Customer = sequelize.define("Customer", {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     // location: { type: DataTypes.STRING, allowNull: false },
//     // contact_info: { type: DataTypes.STRING },
//     // image: { type: DataTypes.STRING },

// }, { timestamps: true });

// module.exports = Customer;
