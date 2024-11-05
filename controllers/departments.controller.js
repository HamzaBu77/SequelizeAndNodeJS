const Departments = require('../models/departments.model');
const Joi = require('../DTO/joi.DTO.js');

const create = async (req, res) => {
  try {
    const body = req?.body;
    const { error } = Joi.departmentDTO.validate(body);
    if (error) {
      return res.status(400).send({ Error: error.message });
    }
    body.establishedAt = Date.now();

    const [department, wasCreated] = await Departments.findOrCreate({
      where: {
        name: body?.name,
        location: body?.location ? body?.location : null,
      },
      defaults: body,
    });

    if (wasCreated) {
      return res.status(201).send({
        message: 'Department created successfully!',
        data: department,
      });
    } else {
      return res.status(400).send({
        Error: 'Department already Existed at the location.',
      });
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
    const departmentsList = await Departments.findAll({
      where: { status: true },
    });

    if (departmentsList.length === 0) {
      return res
        .status(400)
        .send({ Error: 'No Data Existed for departments.' });
    }

    return res.status(200).send({
      message: 'Departments Found successfully!',
      data: departmentsList,
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
      return res.status(400).send({ Error: idValidation.message });
    }

    const findDepartment = await Departments.findOne({
      where: { id: param?.id, status: true },
    });
    if (!findDepartment) {
      return res
        .status(400)
        .send({ Error: 'No Department existed with this id.' });
    }
    return res.status(200).send({
      message: 'Department Found Successfully!',
      data: findDepartment,
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
      return res.status(400).send({ Error: idValidation.message });
    }

    const body = req?.body;
    const { error: bodyValidation } = Joi.updateDepartmentDTO.validate(body);
    if (bodyValidation) {
      return res.status(400).send({ Error: bodyValidation.message });
    }

    const existingDepartment = await Departments.findOne({
      where: {
        name: body?.name,
        location: body?.location ? body?.location : null,
        status: true,
      },
    });

    if (existingDepartment) {
      return res.status(400).send({
        Error: 'Department already exist with same name or location.',
      });
    }

    const [count, updatedDepartment] = await Departments.update(body, {
      where: {
        id: param?.id,
        status: true,
      },
      returning: true,
    });

    if (count === 0) {
      return res.status(400).send({
        Error: 'Updation of Department Failed.',
      });
    }

    return res.status(200).send({
      message: 'Department Updated successfully!',
      data: updatedDepartment[0],
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
      return res.status(400).send({ Error: idValidation.message });
    }
    const [count, deletedDepartment] = await Departments.update(
      { status: false },
      {
        where: { id: param?.id, status: true },
        returning: true,
      }
    );
    if (count === 0) {
      return res.status(400).send({
        Error: 'Department does not exist.',
      });
    }
    return res.status(200).send({
      message: 'Department Deleted successfully!',
      data: deletedDepartment[0],
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      Error: error.message,
    });
  }
};

module.exports = { create, list, show, patch, remove };
