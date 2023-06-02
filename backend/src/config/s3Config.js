const AWS = require("aws-sdk");
const config = require("./config");

// AWS Configuration
AWS.config.update({
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const s3 = new AWS.S3();

// Function to upload an image to S3
const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    // Set the parameters for uploading to S3
    const params = {
      Bucket: config.bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload the file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        reject("Failed to upload file to S3");
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  uploadImage,
};
