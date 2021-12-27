const httpStatus = require('http-status');
const Specials = require('../models/specials.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const result = await Specials.create(req.body);

    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const specials = await Specials.findByIdAndUpdate(id, update);
    if (!specials) {
      throw new APIError('Specials not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Specials.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { specials = null } = req.query;
    const filter = {};
    if (specials) {
      filter.specials = specials;
    }
    const specialsList = await Specials.find(filter).select('-__v');
    return res.status(httpStatus.OK).json({ specialsList });
  } catch (err) {
    next(err);
  }
};

exports.viewOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = {
      _id: id,
    };

    const response = await Specials.findOne(filter).select('-__v');
    return res.json({ response });
  } catch (err) {
    next(err);
  }
}; 
