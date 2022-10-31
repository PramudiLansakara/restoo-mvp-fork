const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const APIError = require('./APIError');

const transformer = (obj, fields = []) => fields.reduce((target, field) => {
  if (Object.prototype.hasOwnProperty.call(obj, field)) {
    return { ...target, [field]: obj[field] };
  }
  return target;
}, {});

const userDetails = (user) => ({
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  address: user.address,
  city: user.city,
});

const checkDuplicateEmailError = (err) => {
  if (err.code === 11000) {
    const error = new Error('Email already taken');
    error.errors = [{
      field: 'email',
      location: 'body',
      messages: ['Email already taken'],
    }];
    error.status = httpStatus.CONFLICT;
    return error;
  }
};

const passwordMatches = (passwordEntered, userPassword) => bcrypt.compare(
  passwordEntered, userPassword,
);

const findAndGenerateToken = async (payload) => {
  const { email, password } = payload;
  if (!email) throw new APIError('Email must be provided for login');

  const user = await User.findOne({ email }).exec();

  if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND);

  if (!user.active) throw new APIError('Access denied', httpStatus.FORBIDDEN);

  const passwordOK = await passwordMatches(password, user.password);

  if (!passwordOK) throw new APIError('Password mismatch', httpStatus.UNAUTHORIZED);
  // if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)
  return user;
};

exports.userDetails = userDetails;

exports.checkDuplicateEmailError = checkDuplicateEmailError;

exports.findAndGenerateToken = findAndGenerateToken;
