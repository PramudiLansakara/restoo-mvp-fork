const express = require('express');

const router = express.Router();
// const validator = require('express-validation');
// const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/payment.controller');
// const validations = require('../../validations/table.validation');

router.post('/', controller.create);
// router.get('/', controller.get);

module.exports = router;