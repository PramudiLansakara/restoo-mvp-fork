const util = require('util');
const multer = require('multer');
const mutlerS3 = require('multer-s3');

const maxSize = 2 * 1024 * 1024;
const uuid = require('uuid/v4');
const path = require('path');

const pathPosix = path.posix;
const config = require('../config');
const { s3 } = require('../aws/s3');

// const destination = 'public/media';

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, destination);
//   },
//   filename: (_req, file, cb) => {
//     const fName = `${path.basename(file.originalname)
//       .replace(/\..+$/, '')
//       .replace(/\s+/g, '-')
//       .toLowerCase()}-${uuid()}${path.extname(file.originalname)}`;
//     cb(null, fName);
//   },
// });

const s3Storage = mutlerS3({
  s3,
  bucket: config.aws.s3Bucket,
  acl: 'private',
  key(_req, file, cb) {
    const filename = pathPosix.join(config.mediaPrefix || '', 'media', `${uuid()}${path.extname(file.originalname)}`);
    cb(null, filename);
  },
});

const uploadFile = multer({
  storage: s3Storage,
  limits: { fileSize: maxSize },
}).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
