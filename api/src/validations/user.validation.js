const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required(),
      phoneNumber: Joi.string().required(),
      address: Joi.string().required(),
      // city: Joi.objectId().required(),
    },
  },
};
