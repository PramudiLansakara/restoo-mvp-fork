const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/specials.controller');
const validations = require('../../validations/specials.validation');

router.post('/new', auth('admin'), validator(validations.create), controller.create);

router.delete('/:id', auth('admin'), controller.delete);

router.put('/:id', auth('admin'), validator(validations.update), controller.update);

router.get('/list', validator(validations.list), controller.list);

router.get('/:id', validator(validations.viewOne), controller.viewOne);

module.exports = router;
