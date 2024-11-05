const Employees = require('../models/employees.model');
const Joi = require('../DTO/joi.DTO.js');
const Departments = require('../models/departments.model.js');

const create = async (req, res) => {
  try {
    const body = req?.body;
    const { error: bodyValidation } = Joi.employeeDTO.validate(body);
    if (bodyValidation) {
      return res.status(400).send({
        Error: bodyValidation.details
          ? bodyValidation.details[0].message
          : bodyValidation.message,
      });
    }

    body.hireDate = Date.now();

    if (body?.departmentId) {
      const department = await Departments.findOne({
        where: {
          id: body?.departmentId,
          status: true,
        },
      });

      if (!department) {
        return res.status(400).send({ Error: 'Department does not Exists.' });
      }
    }

    const whereClause = body?.phone
      ? {
          email: body?.email,
          phone: body?.phone,
        }
      : {
          email: body?.email,
        };

    const [employee, wasCreated] = await Employees.findOrCreate({
      where: whereClause,
      defaults: body,
    });

    if (wasCreated) {
      return res.status(201).send({
        message: 'Employee created successfully!',
        data: employee,
      });
    } else {
      return res
        .status(400)
        .send({ Error: 'Employee Already Existed with given email.' });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const employeesList = await Employees.findAll({
      where: { status: true },
      include: [
        {
          model: Departments,
          as: 'Department',
        },
      ],
    });

    if (employeesList.length === 0) {
      return res.status(400).send({ Error: 'No employees existed.' });
    }

    return res.status(200).send({
      message: 'Employees Found successfully!',
      data: employeesList,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const param = req?.params;
    const { error: idValidation } = Joi.idDTO.validate(param);
    if (idValidation) {
      return res.status(400).send({
        Error: idValidation.details
          ? idValidation.details[0].message
          : idValidation.message,
      });
    }
    const findEmployee = await Employees.findOne({
      where: { id: param?.id, status: true },
      include: [
        {
          model: Departments,
          as: 'Department',
        },
      ],
    });
    if (!findEmployee) {
      return res
        .status(400)
        .send({ Error: 'No Employee existed with this id.' });
    }
    return res.status(200).send({
      message: 'Employee Found Successfully!',
      data: findEmployee,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

const patch = async (req, res) => {
  try {
    const param = req?.params;
    const { error: idValidation } = Joi.idDTO.validate(param);
    if (idValidation) {
      return res.status(400).send({
        Error: idValidation.details
          ? idValidation.details[0].message
          : idValidation.message,
      });
    }
    const body = req?.body;
    const { error: bodyValidation } = Joi.updateEmployeeDTO.validate(body);
    if (bodyValidation) {
      return res.status(400).send({
        Error: bodyValidation.details
          ? bodyValidation.details[0].message
          : bodyValidation.message,
      });
    }

    if (body?.departmentId) {
      const findDepartment = await Departments.findOne({
        where: {
          id: body?.departmentId,
          status: true,
        },
      });
      if (!findDepartment) {
        return res
          .status(400)
          .send({ Error: 'No department Exists with this id.' });
      }
    }

    const [count, updatedEmployee] = await Employees.update(body, {
      where: { id: param?.id, status: true },
      returning: true,
    });
    if (count === 0) {
      return res.status(400).send({
        Error: 'Unable to Update Employee.',
      });
    }

    return res.status(200).send({
      message: 'Employee Updated Successfully!',
      data: updatedEmployee[0],
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const param = req?.params;
    const { error: idValidation } = Joi.idDTO.validate(param);
    if (idValidation) {
      return res.status(400).send({
        Error: idValidation.details
          ? idValidation.details[0].message
          : idValidation.message,
      });
    }
    const [count, deletedEmployee] = await Employees.update(
      { status: false },
      {
        where: {
          id: param?.id,
          status: true,
        },
        returning: true,
      }
    );

    if (count === 0) {
      return res.status(400).send({
        Error: 'Unable to Delete Employee.',
      });
    }

    return res.status(200).send({
      message: 'Employee Deleted Successfully!',
      data: deletedEmployee[0],
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

module.exports = { create, list, show, patch, remove };
