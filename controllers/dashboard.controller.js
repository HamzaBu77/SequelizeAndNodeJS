const Departments = require('../models/departments.model.js');
const Employees = require('../models/employees.model.js');
const Joi = require('../DTO/joi.DTO.js');
const Sequelize = require('sequelize');

const searchEmployeeAndDepartment = async (req, res) => {
  try {
    const query = req?.query;
    const { error: queryValidation } = Joi.queryValidation.validate(query);
    if (queryValidation) {
      return res.status(400).send({ Error: queryValidation.message });
    }

    const employees = await Employees.findAll({
      where: {
        [Sequelize.Op.or]: {
          firstName: {
            [Sequelize.Op.substring]: query?.search,
          },
          lastName: {
            [Sequelize.Op.substring]: query?.search,
          },
          phone: {
            [Sequelize.Op.substring]: query?.search,
          },
          email: {
            [Sequelize.Op.substring]: query?.search,
          },
          title: {
            [Sequelize.Op.substring]: query?.search,
          },
          salary: Sequelize.where(
            Sequelize.cast(Sequelize.col('salary'), 'TEXT'),
            { [Sequelize.Op.substring]: query?.search }
          ),
          departmentId: Sequelize.where(
            Sequelize.cast(Sequelize.col('departmentId'), 'TEXT'),
            { [Sequelize.Op.substring]: query?.search }
          ),
          hireDate: Sequelize.where(
            Sequelize.cast(Sequelize.col('hireDate'), 'TEXT'),
            { [Sequelize.Op.substring]: query?.search }
          ),
        },
        status: true,
      },
    });

    const departments = await Departments.findAll({
      where: {
        [Sequelize.Op.or]: {
          name: {
            [Sequelize.Op.substring]: query?.search,
          },
          location: {
            [Sequelize.Op.substring]: query?.search,
          },
          establishedAt: Sequelize.where(
            Sequelize.cast(Sequelize.col('establishedAt'), 'TEXT'),
            { [Sequelize.Op.substring]: query?.search }
          ),
        },
        status: true,
      },
    });

    if (departments.length === 0 && employees.length === 0) {
      return res
        .status(400)
        .send({ Error: 'No Data Matched the requested query.' });
    }

    return res.status(200).send({
      message: 'Query Matched Successfully!',
      data: {
        departments,
        employees,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

module.exports = { searchEmployeeAndDepartment };