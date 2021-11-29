const express = require('express');

const router = express.Router();
// const validator = require('express-validation');
// const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/mailServer.controller');
// const validations = require('../../validations/payment.validation');

router.get('/', controller.getMail);
router.post('/', controller.sendMail);

module.exports = router;
