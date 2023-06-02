const express = require("express");
const v1Router = require("./v1/image.route");
const router = express.Router();

router.use("/v1", v1Router);

module.exports = router;
