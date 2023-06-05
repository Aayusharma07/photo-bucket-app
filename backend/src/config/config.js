const joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVariablesSchema = joi
  .object()
  .keys({
    PORT: joi.number().default(3000),
    AWS_ACCESS_KEY: joi.string().required(),
    AWS_SECRET_KEY: joi.string().required(),
    AWS_BUCKET_NAME: joi.string().required(),
    AWS_BUCKET_REGION: joi.string().required(),
    CLOUDFRONT_URL: joi.string().required(),
    MONGODB_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVariablesSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  region: envVars.AWS_BUCKET_REGION,
  accessKey: envVars.AWS_ACCESS_KEY,
  secretAccessKey: envVars.secretAccessKey,
  bucketName: envVars.AWS_BUCKET_NAME,
  cloudfrontUrl: envVars.CLOUDFRONT_URL,
  mongodbUrl: envVars.MONGODB_URL,
  jwtsecret: envVars.JWT_SECRET,
};

module.exports = config;
