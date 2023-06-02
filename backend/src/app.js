const express = require("express");
const config = require("./config/config");
const app = express();

app.get("/", (req, res) => {
  res.send("Aayush Sharma");
});

const port = config.port;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
