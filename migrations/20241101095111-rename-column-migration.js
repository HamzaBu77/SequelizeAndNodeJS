"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "Employees",
      "departmentID",
      "departmentId"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "Employees",
      "departmentId",
      "departmentID"
    );
  },
};
