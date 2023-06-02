const { uploadImage } = require("../config/s3Config");

imageUploadController = async (req, res) => {
  const file = req.file;
  try {
    // Check if a file was provided
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the file to S3
    const data = await uploadImage(file);
    res.send({
      code: 200,
      status: "uploaded",
      message: "Image uploaded successfully",
      data: data,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  imageUploadController,
};
