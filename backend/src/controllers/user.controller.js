const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/config")

userSignUp = async (req, res) => {
  const { name, email, password: plainTextPassword } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 7) {
    return res.json({
      status: "error",
      error: "Password should be atleast 7 character",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      name,
      email,
      password,
    });
    console.log("User Created Successfully", response);
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.code === 11000) {
      return res.json({
        code: 400,
        status: "EMAIL_ALREADY_IN_USE",
        error: "Email already in use",
      });
    }
  }
  res.json({
    code: 200,
    status: "USER_REGISTERED",
    message: "Registered Successfully",
  });
};

userSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid email and password" });
  }

  if (bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtsecret
    );

    return res.json({
      status: "ok",
      message: "Login Successful",
      role: user.role,
      data: token,
    });
  }
  res.json({ status: "ok" });
};

module.exports = {
  userSignUp,
  userSignin,
};
