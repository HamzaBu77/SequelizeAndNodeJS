'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Employees', 'departmentID', {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: 'Departments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Employees', 'departmentID');
  },
};
