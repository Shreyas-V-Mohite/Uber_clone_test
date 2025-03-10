'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adding new columns
    await queryInterface.addColumn("Customers", "dob", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Customers", "city", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Customers", "state", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Customers", "country", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Customers", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Customers", "profilePicture", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Removing added columns (rollback functionality)
    await queryInterface.removeColumn("Customers", "dob");
    await queryInterface.removeColumn("Customers", "city");
    await queryInterface.removeColumn("Customers", "state");
    await queryInterface.removeColumn("Customers", "country");
    await queryInterface.removeColumn("Customers", "phone");
    await queryInterface.removeColumn("Customers", "profilePicture");
  }
};
