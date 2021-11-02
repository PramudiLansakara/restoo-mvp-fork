const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/authorization');
const waitersController = require('../../controllers/waiters.controller');

router.get('/list', auth('admin'), waitersController.getList);

module.exports = router;
