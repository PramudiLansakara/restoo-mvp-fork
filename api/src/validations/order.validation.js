const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  placeOrder: {
    body: {
      note: Joi.string().allow('', null).optional(),
      orderType: Joi.string().allow('', null).optional(),
      items: Joi.array().items(Joi.object({
        item: Joi.objectId().required(),
        quantity: Joi.number().integer().required(),
        price: Joi.number().required(),
        name: Joi.string().required(),
      })).min(1).required(),
    },
  },
  listMyOrders: {
    query: {
      status: Joi.string().allow(null).valid(
        'waiting',
        'accepted',
        'preparing',
        'served',
        'completed',
        'cancelled',
      ).optional(),
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().min(0).optional(),
      sort: Joi.string().allow(null).valid('asc', 'desc').optional(),
    },
  },
  listOrders: {
    query: {
      status: Joi.string().allow(null).valid(
        'waiting',
        'accepted',
        'preparing',
        'served',
        'completed',
        'cancelled',
      ).optional(),
      userId: Joi.objectId().allow(null).optional(),
      waiterId: Joi.objectId().allow(null).optional(),
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
        'preparing',
        'served',
        'completed',
        'cancelled',
      ).required(),
    },
  },
};
