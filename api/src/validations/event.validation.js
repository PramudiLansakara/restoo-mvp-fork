const Joi = require('joi');

module.exports = {
  create: {
    body: {
      name: Joi.string(),
      description: Joi.string().allow(''),
      time: Joi.string(),
      date: Joi.date(),
      bannerImg: Joi.string(),
    },
  },
  viewEvent: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  list: {
    query: {
      // category: Joi.objectId().optional(),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
  },
};
