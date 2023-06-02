const express = require("express");
const { imageUploadController } = require("../../controllers/image.controller");
const { upload } = require("../../config/multerConfig");

const router = express.Router();

router.post("/upload/image", upload.single('file'), imageUploadController);
router.get('/images/all', getAllImagesController);

module.exports = router;
