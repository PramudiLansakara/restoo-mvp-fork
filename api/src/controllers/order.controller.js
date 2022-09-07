const httpStatus = require('http-status');
const { customAlphabet } = require('nanoid/async');
const moment = require('moment');
const Order = require('../models/order.model');
const FoodItem = require('../models/foodItem.model');
const APIError = require('../utils/APIError');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoid = customAlphabet(alphabet, 8);
/**
 * Generates an order id
 *
 * @returns {Promise<string>}
 */
async function generateOrderRef() {
  const [pt1, pt2] = await Promise.all([
    nanoid(),
    nanoid(),
  ]);
  return `${moment().format('YYYYMMDD')}-${pt1}-${pt2}`;
}

exports.placeOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      note = null, orderType = null, paymentMethod,
      items, customer, deliveryCharge, discount,
    } = req.body;

    const itemsObjects = await FoodItem.find({
      _id: {
        $in: items.map((i) => i.item),
      },
    });

    // if (itemsObjects.length !== items.length) {
    //   throw new APIError('Invalid items', httpStatus.BAD_REQUEST);
    // }
    console.log(itemsObjects.length);

    let total = items.reduce((tot, item) => tot + item.priceDetails.price
    * item.priceDetails.quantity, 0);

    if (orderType === 'takeaway') {
      total -= (total * 0.1);
    } else {
      total += deliveryCharge;
    }

    const reference = await generateOrderRef();

    // TODO: validate items exists
    const order = await Order.create({
      note,
      orderType,
      items,
      paymentMethod,
      currency: 'eur',
      placedAt: new Date(),
      customer,
      total,
      reference,
      deliveryCharge,
      discount,
      table: Math.round(1 + Math.random() * 20),
    });

    return res.status(httpStatus.CREATED).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.listMyOrders = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      status = null, offset = 0, limit = 10, sort = 'asc',
    } = req.query;
    const filter = {
      customer: user._id,
    };
    if (status) {
      filter.status = status;
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .select('-items -__v')
      .skip(offset)
      .limit(limit)
      .sort({ placedAt: sort === 'asc' ? 1 : -1 });
    return res.json({ orders, total });
  } catch (err) {
    next(err);
  }
};

exports.listOrders = async (req, res, next) => {
  try {
    const {
      status = null,
      offset = 0,
      limit = 10,
      sort = 'asc',
      userId = null,
      waiterId = null,
    } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (userId) {
      filter.customer = userId;
    }
    if (waiterId) {
      filter.waiter = waiterId;
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .select('-__v')
      .skip(offset)
      .limit(limit)
      .sort({ placedAt: sort === 'asc' ? 1 : -1 });
    return res.json({ orders, total });
  } catch (err) {
    next(err);
  }
};

exports.ordersReport = async (req, res, next) => {
  try {
    const {
      from = null,
      offset = 0,
      limit = 10,
      sort = 'asc',
      to = null,
    } = req.query;
    const filter = {};

    if (from && to) {
      filter.fromDate = Date.parse(from);
      filter.toDate = Date.parse(to);
      const orders = await Order.find({
        placedAt: {
          $gte: new Date(filter.fromDate),
          $lt: new Date(filter.toDate),
        },
      });
      const total = orders.reduce((tot, item) => tot + item.total, 0);
      return res.json({ orders, total });
    }

    const orders = await Order.find(filter)
      .select('-__v')
      .skip(offset)
      .limit(limit)
      .sort({ placedAt: sort === 'asc' ? 1 : -1 });

    const total = orders.reduce((tot, item) => tot + item.total, 0);

    return res.json({ orders, total });
  } catch (err) {
    next(err);
  }
};

exports.viewOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = {
      _id: id,
    };

    const order = await Order
      .findOne(filter)
      .populate({ path: 'items.item', select: '-__v -todaySpecial' })
      .populate({ path: 'customer', select: 'name role' })
      .populate({ path: 'waiter', select: 'name role' });
    return res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.selfAssignWaiter = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      throw new APIError('Order not found', httpStatus.NOT_FOUND);
    }

    if (!['waiting', 'accepted'].includes(order.status)) {
      throw new APIError('Only waiting/accepted orders are allowed');
    }

    if (order.waiter && order.waiter !== null) {
      throw new APIError('Already assigned');
    }

    order.waiter = user._id;
    await order.save();

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

const validStates = {
  waiting: ['accepted', 'declined'],
  accepted: [],
  declined: [],
};

function canDoStateTransition(fromState, toState) {
  return validStates[fromState].includes(toState);
}

async function stateAction(state, order) {
  switch (state) {
    case 'accepted':
      order.acceptedAt = new Date();
      break;

    case 'declined':
      order.cancelledAt = new Date();
      break;

    default:
      break;
  }

  order.status = state;
  await order.save();
}

exports.changeOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      throw new APIError('Order not found', httpStatus.NOT_FOUND);
    }

    if (!canDoStateTransition(order.status, status)) {
      throw new APIError(`Cannot change ${order.status} to ${status}`);
    }
    await stateAction(status, order);

    return res.status(httpStatus.OK).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const order = await Order.findByIdAndUpdate(id, update);
    if (!order) {
      throw new APIError('order not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ order });
  } catch (err) {
    next(err);
  }
};
