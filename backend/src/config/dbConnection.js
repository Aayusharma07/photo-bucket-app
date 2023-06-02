const mongoose = require("mongoose");
const config = require("./config")

mongoose
  .connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
