const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/imageupload.controller');
const fileUpload = require('../../middlewares/upload');

router.post('/upload', auth('admin'), fileUpload, controller.getImagePath);

module.exports = router;
