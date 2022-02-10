const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/payment.controller');
const validations = require('../../validations/payment.validation');

router.post('/', validator(validations.create), controller.create);
router.post('/webhook', controller.createdHook);
router.get('/session/:id', validator(validations.createStripePaymentSession), controller.createStripePaymentSession);
router.get('/list', auth(), controller.list);
router.put('/:id', validator(validations.update), controller.update);

module.exports = router;
