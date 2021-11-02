const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../../middlewares/authorization');
const controller = require('../../../controllers/fooditem.controller');
const validations = require('../../../validations/food/item.validation');

router.post('/', auth('admin'), validator(validations.create), controller.create);

router.put('/:id', auth('admin'), validator(validations.update), controller.update);

router.delete('/:id', auth('admin'), controller.delete);

router.get('/list', validator(validations.list), controller.list);

router.put('/todayspecial/:id/:action', auth('admin'), validator(validations.todaySpecial), controller.markAsTodaySpecial);

router.get('/todayspecial', controller.getTodaySpecials);

router.get('/:id', controller.get);

module.exports = router;
