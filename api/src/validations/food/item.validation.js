const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().max(500).allow(''),
      prices: Joi.array().items(Joi.object({
        name: Joi.string().allow(null, '').required(),
        amount: Joi.number().required(),
        discountPrice: Joi.number().optional(),
        currency: Joi.string(),
      })).min(1).required(),
      category: Joi.objectId().required(),
      discountPrice: Joi.number().optional(),
      itemUrl: Joi.string().optional(),
    },
  },
  delete: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      name: Joi.string().optional(),
      description: Joi.string().max(500).allow('').optional(),
      price: Joi.number().optional(),
      discountPrice: Joi.number().optional(),
      category: Joi.objectId().optional(),
    },
  },
  list: {
    query: {
      category: Joi.objectId().optional(),
    },
  },
  todaySpecial: {
    params: {
      id: Joi.objectId().required(),
      action: Joi.string().valid('mark', 'unmark').required(),
    },
  },
};
