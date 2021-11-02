require('dotenv').config(); // load .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  mediahost: process.env.MEDIA_HOST,
  mongo: {
    uri: process.env.MONGO_URI,
    testURI: process.env.MONGOTESTURI,
  },
  transporter: {
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    username: process.env.TRANSPORTER_USERNAME,
    password: process.env.TRANSPORTER_PASSWORD,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION,
  },
  mediaPrefix: process.env.MEDIA_PREFIX,
};
