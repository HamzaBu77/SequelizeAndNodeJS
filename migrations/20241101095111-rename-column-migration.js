'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Employees',
      'departmentID',
      'departmentId'
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Employees',
      'departmentId',
      'departmentID'
    );
  },
};
