const Express = require('express');
const Controller = require('../controllers/dashboard.controller.js');

const router = Express.Router();

router.get('/', Controller.searchEmployeeAndDepartment);

module.exports = router;
