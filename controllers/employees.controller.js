const Employees = require("../models/employees.model");
const UUIDHelper = require("../helpers/uuid.helper.js");

const create = async (req, res) => {
  try {
    const body = req?.body;
    if (!body?.email) {
      res.status(400).send({ Error: "Email is missing." });
    }

    const newEmployee = {
      firstName: body?.firstName,
      lastName: body?.lastName,
      email: body?.email,
      phone: body?.phone,
      hireDate: Date.now(),
      title: body?.title,
      departmentId: body?.departmentId,
      salary: body?.salary,
    };

    const whereClause = body?.phone
      ? {
          email: body?.email,
          phone: body?.phone,
        }
      : {
          email: body?.email,
        };

    const checkEmployeeWithEmailAlreadyExistsOrCreateEmployee =
      await Employees.findOrCreate({
        where: whereClause,
        defaults: newEmployee,
      })
        .then(([user, created]) => {
          if (created) {
            return res.status(201).send({
              message: "Employee created successfully!",
              data: user,
            });
          } else {
            return res
              .status(400)
              .send({ Error: "Employee with email already Exists." });
          }
        })
        .catch((error) => {
          res.status(400).send({ Error: error.message });
        });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const listAllEmployees = await Employees.findAll({
      where: { status: true },
    });

    if (listAllEmployees.length === 0) {
      return res.status(400).send({ Error: "No Data to show." });
    }

    return res.status(200).send({
      message: "Employees Found successfully!",
      data: listAllEmployees,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const param = req?.params;
    if (!param?.id) {
      return res.status(400).send({ Error: "Id is missing in parameters." });
    }
    if (!UUIDHelper(param?.id)) {
      return res.status(400).send({ message: "Invalid UUID format." });
    }
    const findEmployee = await Employees.findOne({
      where: { id: param?.id, status: true },
    });
    if (!findEmployee) {
      return res
        .status(400)
        .send({ Error: "No Employee existed with this id." });
    }
    return res.status(200).send({
      message: "Employee Found Successfully!",
      data: findEmployee,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
};

const patch = async (req, res) => {
  try {
    const param = req?.params;
    if (!param?.id) {
      return res.status(400).send({ Error: "Id is missing in parameters." });
    }
    if (!UUIDHelper(param?.id)) {
      return res.status(400).send({ message: "Invalid UUID format." });
    }
    const body = req?.body;
    if (Object.keys(body).length === 0) {
      return res.status(400).send({ Error: "No Data is given in body." });
    }
    const [count, updatedEmployee] = await Employees.update(body, {
      where: { id: param?.id, status: true },
    });
    console.log("COUNT", count), console.log("Update", updatedEmployee);

    if (count === 0) {
      return res.status(400).send({
        Error: "No Employee Updated or existed with the required Id.",
      });
    }

    return res.status(200).send({
      message: "Employee Updated Successfully!",
      data: updatedEmployee[0],
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
};

module.exports = { create, list, show, patch };
