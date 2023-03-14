const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  placeOrder: {
    body: {
      note: Joi.string().allow('', null).optional(),
      orderType: Joi.string().allow('', null).valid(
        'delivery',
        'takeaway',
      ).optional(),
      items: Joi.array().items(Joi.object({
        item: Joi.objectId().required(),
        priceDetails: Joi.object({
          id: Joi.objectId().required(),
          name: Joi.string().required(),
          price: Joi.number().required(),
          quantity: Joi.number().integer().required(),
        }).required(),
        name: Joi.string().required(),
        itemNote: Joi.string().allow('', null).optional(),
      })).min(1).required(),
      customer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
      }).required(),
    },
  },
  listMyOrders: {
    query: {
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().min(0).optional(),
      sort: Joi.string().allow(null).valid('asc', 'desc').optional(),
    },
  },
  listOrders: {
    query: {
      userId: Joi.objectId().allow(null).optional(),
      waiterId: Joi.objectId().allow(null).optional(),
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().min(0).optional(),
      sort: Joi.string().allow(null).valid('asc', 'desc').optional(),
    },
  },
  ordersReport: {
    query: {
      from: Joi.date().optional(),
      to: Joi.date().optional(),
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().min(0).optional(),
      sort: Joi.string().allow(null).valid('asc', 'desc').optional(),
    },
  },
  viewMyOrder: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  selfAssignWaiter: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  changeOrderStatus: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      status: Joi.string().valid(
        'waiting',
        'accepted',
        'declined',
      ).required(),
    },
  },
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      note: Joi.string().allow('', null).optional(),
      orderType: Joi.string().allow('', null).optional(),
      items: Joi.array().items(Joi.object({
        item: Joi.objectId().required(),
        quantity: Joi.number().integer().required(),
        price: Joi.number().required(),
        name: Joi.string().required(),
      })).optional(),
    },
  },
};
