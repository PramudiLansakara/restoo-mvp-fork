const Stripe = require('stripe');
const httpStatus = require('http-status');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const APIError = require('../utils/APIError');

const stripe = Stripe(process.env.STRIPE_SK);
const frontendUrl = process.env.FRONTEND_URL;

async function getPlacedOrder(order) {
  const placedOrder = await Order
    .findOne({ _id: order })
    .populate({ path: 'items.item', select: '-__v -todaySpecial' })
    .populate({ path: 'customer', select: 'name role' })
    .populate({ path: 'waiter', select: 'name role' });
  return placedOrder;
}

exports.create = async (req, res, next) => {
  try {
    const { paymentMethod, status, order } = req.body;
    const placedOrder = await getPlacedOrder(order);

    if (!placedOrder) {
      throw new APIError('Order not found', httpStatus.NOT_FOUND);
    }

    const result = await Payment.create({
      paymentMethod,
      totalAmount: placedOrder.total,
      currency: 'eur',
      status,
      order,
      paidAt: new Date(),
    });
    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.createdHook = async (req, res, next) => {
  try {
    const event = req.body;
    const eventData = event.data.object;

    if (event.type === 'checkout.session.completed') {
      const placedOrder = await getPlacedOrder(eventData.client_reference_id);
      if (!placedOrder) {
        throw new APIError('Order not found', httpStatus.NOT_FOUND);
      }
      const result = await Payment.create({
        paymentMethod: placedOrder.paymentMethod,
        totalAmount: placedOrder.total,
        currency: eventData.currency,
        status: eventData.payment_status,
        order: eventData.client_reference_id,
        paidAt: new Date(),
      });
      return res.status(httpStatus.CREATED).json({ paymentId: result._id });
    }

    return res.status(httpStatus.OK).json({ event: event.type });
  } catch (err) {
    next(err);
  }
};

exports.list = async (_req, res, next) => {
  try {
    const payments = await Payment.find({});
    return res.status(httpStatus.OK).json({ payments });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const onePayment = await Payment.findOne({ _id: id });
    if (!onePayment) {
      throw new APIError('Payment not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ onePayment });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const payment = await Payment.findByIdAndUpdate(id, update);
    if (!payment) {
      throw new APIError('Payment not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.setStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(id, { $set: { status } });
    if (!payment) {
      throw new APIError('Payment not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.createStripePaymentSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order
      .findOne({ _id: id });

    const lineItems = order.items.map((product) => {
      const unitAmount = product.price * 100;
      return {
        price_data: {
          currency: 'eur',
          unit_amount: unitAmount,
          product_data: {
            name: product.name,
          },
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}thank-you?id=${id}&status=success`,
      cancel_url: `${frontendUrl}thank-you?id=${id}&status=failed`,
      client_reference_id: id,
    });

    return res.status(httpStatus.CREATED).json({ id: session.id });
  } catch (err) {
    next(err);
  }
};
