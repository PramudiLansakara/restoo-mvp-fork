const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../../middlewares/authorization');
const controller = require('../../../controllers/foodcategory.controller');
const validations = require('../../../validations/food/category.validation');

router.post('/', auth('admin'), validator(validations.create), controller.create);
router.put('/:id', auth('admin'), validator(validations.update), controller.update);
router.delete('/:id', auth('admin'), controller.delete);
router.get('/list', controller.list);
router.get('/:id', controller.get);

module.exports = router;
