"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.DataTypes.STRING(255),
        unique: true,
        allowNull: true,
      },
      hireDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      salary: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
