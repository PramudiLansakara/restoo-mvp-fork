const httpStatus = require('http-status');
const City = require('../models/city.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const result = await City.create(req.body);
    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const update = req.body;
    const city = await City.findByIdAndUpdate(id, update);
    if (!city) {
      throw new APIError('City not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (_req, res, next) => {
  try {
    const cities = await City.find().sort('name').select('-__v');
    return res.status(httpStatus.OK).json({ cities });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await City.deleteOne({ _id: id });
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;

    const city = await City.findOne({ _id: id });
    return res.status(httpStatus.OK).json({ city });
  } catch (err) {
    next(err);
  }
};