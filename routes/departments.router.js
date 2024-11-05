const Express = require('express');
const Controller = require('../controllers/departments.controller.js');

const router = Express.Router();

router.get('/', Controller.list);
router.get('/:id', Controller.show);
router.post('/', Controller.create);
router.patch('/:id', Controller.patch);
router.delete('/:id', Controller.remove);

module.exports = router;
