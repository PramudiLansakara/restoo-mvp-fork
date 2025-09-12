const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authorization");
const multer = require("multer");
const controller = require("../../controllers/imageupload.controller");

const upload = multer(); // memory storage
router.post("/upload", auth("admin"), upload.single("file"), controller.getImagePath);

module.exports = router;
