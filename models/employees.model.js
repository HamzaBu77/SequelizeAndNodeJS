const SQInstance = require("../config/database.config.js");
const Sequelize = require("sequelize");
const Department = require("./departments.model.js");

const employees = SQInstance.define(
  "Employees",
  {
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
    departmentId: {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: "Departments",
        key: "id",
      },
      onDelete: "CASCADE",
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

employees.belongsTo(Department, {
  foreignKey: "departmentId",
  onDelete: "CASCADE",
});
Department.hasMany(employees, { foreignKey: "departmentId" });

module.exports = employees;
