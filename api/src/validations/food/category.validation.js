const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User validation rules
module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().max(500).allow(''),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      name: Joi.string(),
      description: Joi.string().max(500).allow(''),
    },
  },
  delete: {
    params: {
      id: Joi.objectId().required(),
    },
  },
};
