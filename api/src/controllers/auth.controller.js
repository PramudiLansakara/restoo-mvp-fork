const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const uuidv1 = require('uuid/v1');
const config = require('../config');
const User = require('../models/user.model');
const APIError = require('../utils/APIError');

const {
  userDetails,
  checkDuplicateEmailError,
  findAndGenerateToken,
} = require('../utils/users');

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1();
    const { body } = req;
    if (req.body.role === 'admin') {
      const error = new Error('Cannot Create a new admin account');
      return next(error);
    }
    body.activationKey = activationKey;
    const user = new User(body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(userDetails(savedUser));
  } catch (error) {
    return next(checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await findAndGenerateToken(req.body);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret);
    return res
      .status(200)
      .json({ message: 'OK', token, user: userDetails(user) });
  } catch (error) {
    next(error);
  }
};

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { activationKey: req.query.key },
      { active: true },
    );
    return res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { user = null } = req.query;
    const filter = {};
    if (user) {
      filter.user = user;
    }
    const users = await User.find(filter).sort('createdAt').select('-__v');
    return res.status(httpStatus.OK).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { $set: { active: true } });
    if (!user) {
      throw new APIError('User not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { $set: { active: false } });
    if (!user) {
      throw new APIError('User not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

