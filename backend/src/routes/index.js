const express = require("express");
const routes = require('./v1/index');
const router = express.Router();

router.use("/v1", routes);

module.exports = router;
