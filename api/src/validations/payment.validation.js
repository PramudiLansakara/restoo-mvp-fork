const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  create: {
    body: {
      order: Joi.objectId().required(),
      paymentMethod: Joi.string().required(),
      status: Joi.string().allow(null).valid(
        'unpaid',
        'paid',
        'cancelled',
      ).optional(),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      status: Joi.string().allow(null).valid(
        'unpaid',
        'paid',
        'cancelled',
      ).optional(),
    },
  },
  getSession: {
    params: {
      id: Joi.objectId().required(),
    },
  },
};
