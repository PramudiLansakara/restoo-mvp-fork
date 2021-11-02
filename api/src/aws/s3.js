const aws = require('aws-sdk');
const config = require('../config');

const s3 = new aws.S3({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.region,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

exports.s3 = s3;
