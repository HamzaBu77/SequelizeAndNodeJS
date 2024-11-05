const Joi = require('joi');

const departmentDTO = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  location: Joi.string().min(3).max(30).optional(),
});

const idDTO = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
}).error(errors => {
  return errors.map(err => {
    return new Joi.ValidationError(
      'Invalid UUID format. Please provide a valid UUID v4.',
      err.details,
      err
    );
  });
});

const updateDepartmentDTO = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  location: Joi.string().min(3).max(30).optional(),
  status: Joi.boolean().optional(),
});

const employeeDTO = Joi.object({
  firstName: Joi.string().min(3).max(30).optional(),
  lastName: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(11).max(12).optional(),
  title: Joi.string().min(3).max(30).optional(),
  salary: Joi.number().optional(),
  departmentId: Joi.string()
    .guid({ version: 'uuidv4' })
    .optional()
    .error(new Error('departmentId must be a valid UUID (version 4).')),
});

const updateEmployeeDTO = Joi.object({
  firstName: Joi.string().min(3).max(30).optional(),
  lastName: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().min(11).max(12).optional(),
  title: Joi.string().min(3).max(30).optional(),
  salary: Joi.number().optional(),
  departmentId: Joi.string()
    .guid({ version: 'uuidv4' })
    .optional()
    .error(new Error('departmentId must be a valid UUID (version 4).')),
});

const queryValidation = Joi.object({
  search: Joi.string().required(),
});

module.exports = {
  departmentDTO,
  idDTO,
  updateDepartmentDTO,
  employeeDTO,
  updateEmployeeDTO,
  queryValidation,
};
