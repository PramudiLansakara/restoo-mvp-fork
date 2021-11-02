const httpStatus = require('http-status');
const FoodCategory = require('../models/foodCategory.model');
const FoodItem = require('../models/foodItem.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const result = await FoodCategory.create(req.body);
    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const update = req.body;
    const category = await FoodCategory.findByIdAndUpdate(id, update);
    if (!category) {
      throw new APIError('Category not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await FoodCategory.deleteOne({ _id: id });
    await FoodItem.deleteMany({ category: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (_req, res, next) => {
  try {
    const categories = await FoodCategory.find().sort('name').select('-__v');
    return res.status(httpStatus.OK).json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await FoodCategory.findOne({ _id: id });

    return res.status(httpStatus.OK).json({ category });
  } catch (err) {
    next(err);
  }
};
