'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename profilePicture to images in Customers table
    await queryInterface.renameColumn('Customers', 'profilePicture', 'images');
    
    // Add images column to Restaurants table
    await queryInterface.addColumn('Restaurants', 'images', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add images column to Dishes table
    await queryInterface.addColumn('Dishes', 'images', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert images column to profilePicture in Customers table
    await queryInterface.renameColumn('Customers', 'images', 'profilePicture');
    
    // Remove images column from Restaurants table
    await queryInterface.removeColumn('Restaurants', 'images');
    
    // Remove images column from Dishes table
    await queryInterface.removeColumn('Dishes', 'images');
  }
};