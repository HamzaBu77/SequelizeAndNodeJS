"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Employees", "createdAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("Employees", "updatedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("Departments", "createdAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("Departments", "updatedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Employees", "createdAt");
    await queryInterface.removeColumn("Employees", "updatedAt");

    await queryInterface.removeColumn("Departments", "createdAt");
    await queryInterface.removeColumn("Departments", "updatedAt");
  },
};
