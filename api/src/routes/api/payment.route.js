const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/payment.controller');
const validations = require('../../validations/payment.validation');

router.post('/', validator(validations.create), auth(), controller.create);
router.get('/:id', validator(validations.getSession), auth(), controller.getSession);
router.put('/:id', validator(validations.update), auth(), controller.update);

module.exports = router;