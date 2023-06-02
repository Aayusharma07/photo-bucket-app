const multer = require("multer");

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  upload,
};
