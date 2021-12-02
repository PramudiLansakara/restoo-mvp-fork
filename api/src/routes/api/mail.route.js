const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/mailServer.controller');
const validations = require('../../validations/mail.validation');

router.post('/reservationFeedback', auth('admin'), validator(validations.sendMail), controller.sendMail);

module.exports = router;
