// Packages & Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config/config");
const db = require("./config/dbConnection");
const routes = require("./routes");
const app = express();

// Middleware

//logger
app.use(morgan("dev"));
// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Database Connected Successfully 🚀!!!");
});

// Routes
app.use("/api", routes);

// Port
const port = config.port;

// Server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
