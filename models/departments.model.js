const SQInstance = require("../config/database.config.js");
const Sequelize = require("sequelize");

const departments = SQInstance.define(
  "Departments",
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = departments;
