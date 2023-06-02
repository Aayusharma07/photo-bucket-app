const express = require("express");
const { imageUploadController } = require("../../controllers");
const { upload } = require("../../config/multerConfig");

const router = express.Router();

router.post("/upload", upload.single('file'), imageUploadController);

module.exports = router;
