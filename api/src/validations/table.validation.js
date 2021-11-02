const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  create: {
    body: {
      tableNumber: Joi.number().required(),
      status: Joi.string().allow(null).valid(
        'active',
        'deactive',
      ).optional(),
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
      tableNumber: Joi.number().required(),
      status: Joi.string().allow(null).valid(
        'active',
        'deactive',
      ).optional(),
    },
  },
  getOneTable: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  setAllStatus: {
    body: {
      status: Joi.string().allow(null).valid(
        'active',
        'deactive',
      ).required(),
    },
  },
};
