const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("./config");

auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.jwtsecret, function (err, decodedToken) {
      if (err) {
        res.send(err);
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ status: "unauthorized" });
  }
};

module.exports = {
  auth,
};
