const Express = require("express");
const Controller = require("../controllers/departments.controller.js");

const router = Express.Router();

router.post("/", Controller.create);

module.exports = router;
