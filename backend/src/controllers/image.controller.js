const { uploadImage } = require("../config/s3Config");
const uploadedImages = require("../models/image.model");
const config = require("../config/config");

imageUploadController = async (req, res) => {
  const file = req.file;
  try {
    // Check if a file was provided
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the file to S3
    const data = await uploadImage(file);
    const imageData = new uploadedImages({
      filename: data.key,
      orignalname: data.key,
      filepath: `${config.cloudfrontUrl}/${data.key}`,
      category: req.body.category,
      createdBy: req.userId,
    });
    imageData.save().then(() => {
      return res.send({
        code: 200,
        status: "uploaded",
        message: "Image uploaded successfully",
        data: data,
      });
    });
  } catch (err) {
    res.send(err);
  }
};

getAllImagesController = async (req, res) => {
  await uploadedImages
    .find({})
    .then((images) => {
      return res.send({
        status: 200,
        message: "images fetched successfully",
        data: images,
      });
    })
    .catch((err) => {
      return res.send({
        status: 200,
        message: "unable to fetch from database",
        error: err,
      });
    });
};

module.exports = {
  imageUploadController,
  getAllImagesController,
};
