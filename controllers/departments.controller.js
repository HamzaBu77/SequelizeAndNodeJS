const Departments = require("../models/departments.model");

const create = async (req, res) => {
  try {
    const body = req?.body;
    if (!body?.name) {
      return res.status(400).send({ Error: "Name is required." });
    }
    const newDepartment = {
      name: body?.name,
      location: body?.location,
      establishedAt: Date.now(),
    };

    if (body?.location) {
      const checkDepartmentExistOnSameLocation = await Departments.findOrCreate(
        {
          where: { name: body?.name, location: body?.location },
          defaults: newDepartment,
        },
      )
        .then(([department, created]) => {
          if (created) {
            return res.status(201).send({
              message: "Department created successfully!",
              data: department,
            });
          } else {
            return res
              .status(400)
              .send({ Error: "Department already Exists on this location." });
          }
        })
        .catch((error) => {
          return res.status(400).send({ Error: error.message });
        });
    } else {
      const createDepartment = await Departments.create(newDepartment);
      console.log(createDepartment);
      if (!createDepartment) {
        return res.status(400).send({ Error: "Failed to create Department" });
      }
      return res.status(201).send({
        message: "Department created successfully!",
        data: createDepartment,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Error: error.message,
    });
  }
};

module.exports = { create };
