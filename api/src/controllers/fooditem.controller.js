const httpStatus = require('http-status');
const FoodCategory = require('../models/foodCategory.model');
const FoodItem = require('../models/foodItem.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const { category } = req.body;
    const cat = await FoodCategory.findById(category).select('_id');
    if (!cat) {
      throw new APIError('Category not found', httpStatus.NOT_FOUND);
    }

    const result = await FoodItem.create(req.body);
    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const item = await FoodItem.findByIdAndUpdate(id, update);
    if (!item) {
      throw new APIError('Item not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await FoodItem.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { category = null } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const foods = await FoodItem.find(filter).sort('name').select('-__v').populate({ path: 'category', select: 'name' });
    return res.status(httpStatus.OK).json({ foods });
  } catch (err) {
    next(err);
  }
};

exports.markAsTodaySpecial = async (req, res, next) => {
  try {
    const { id, action } = req.params;

    const food = await FoodItem.findById(id);
    if (!food) {
      throw new APIError('Food item not found', httpStatus.NOT_FOUND);
    }

    food.todaySpecial = action === 'mark';
    await food.save();

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.getTodaySpecials = async (_req, res, next) => {
  try {
    const foods = await FoodItem.find({ todaySpecial: true }).select('-__v');
    return res.status(httpStatus.OK).json({ foods });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foodItem = await FoodItem.findOne({ _id: id }).populate({ path: 'category', select: 'name' });
    return res.status(httpStatus.OK).json({ foodItem });
  } catch (err) {
    next(err);
  }
};
