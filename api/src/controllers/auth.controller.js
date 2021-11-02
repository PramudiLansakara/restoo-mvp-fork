const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const uuidv1 = require('uuid/v1');
const config = require('../config');
const User = require('../models/user.model');
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
