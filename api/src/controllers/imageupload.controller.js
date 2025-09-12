const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

exports.getImagePath = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new APIError('Image File Not Fount', httpStatus.NOT_FOUND);
    }

    // const imgPath = (req.file.path)
    //   .replace(/\\/g, '/')
    //   .replace('public/', '/');

    return res.status(httpStatus.OK).json({ imgPath: req.file.key });
  } catch (err) {
    next(err);
  }
};
