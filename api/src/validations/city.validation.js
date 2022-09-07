const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  create: {
    body: {
      city: Joi.string().required(),
      deliveryCharge: Joi.number().required(),
      minAmount: Joi.number().required(),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      city: Joi.string(),
      deliveryCharge: Joi.number(),
      minAmount: Joi.number().required(),
    },
  },
  delete: {
    params: {
      id: Joi.objectId().required(),
    },
  },
};
