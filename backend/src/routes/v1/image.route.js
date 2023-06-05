const express = require("express");
const { imageUploadController } = require("../../controllers/image.controller");
const { upload } = require("../../config/multerConfig");
const { auth } = require("../../config/auth");

const router = express.Router();

router.post("/upload", auth, upload.single("file"), imageUploadController);
router.get("/all", auth, getAllImagesController);

module.exports = router;
