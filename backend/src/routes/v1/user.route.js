const express = require("express");
const { userSignUp, userSignin } = require("../../controllers/user.controller");
const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userSignin);

module.exports = router;
