const multer = require("multer");

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Check if the file type is JPEG or PNG
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG or PNG files are allowed"));
    }
  },
});

module.exports = {
  upload,
};
