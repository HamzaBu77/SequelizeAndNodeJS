'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Departments', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      establishedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Departments');
  },
};
