const Stripe = require('stripe');
const httpStatus = require('http-status');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const APIError = require('../utils/APIError');

const stripe = Stripe('sk_test_51Js3YUEhEKYau5wJnBdGxvbZFRGG28OzdbHfQ51P6VhRvwywCn4HTsn3brRM0377wfsECgreyHbe4ZCsHe2xOyNr00nwZxQ4q6');

exports.create = async (req, res, next) => {
  try {
    const { paymentMethod, totalAmount, status, order } = req.body;
    const placedOrder = await Order
      .findOne({ _id: order })
      .populate({ path: 'items.item', select: '-__v -todaySpecial' })
      .populate({ path: 'customer', select: 'name role' })
      .populate({ path: 'waiter', select: 'name role' }
      );
    if (!placedOrder) {
      throw new APIError('Order not found', httpStatus.NOT_FOUND);
    }

    const result = await Payment.create({
      paymentMethod,
      totalAmount,
      status,
      order,
      paidAt: new Date(),
    });
    return res.status(httpStatus.CREATED).json({ id: result._id });
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

    const payment = await Payment.findByIdAndUpdate(id, {$set:{status: status}})
    if (!payment) {
      throw new APIError('Payment not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lineItems = [];
    const order = await Order
      .findOne({ _id: id });

    order.items.map((ptoduct) => {
      const unitAmount=ptoduct.price*100;
      const oneItem ={
        price_data: {
          currency: 'eur',
          unit_amount: unitAmount,
          product_data: {
            name: ptoduct.name,
          },
        },
        quantity: ptoduct.quantity,
      }
      lineItems.push(oneItem);
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/thank-you',
      cancel_url: 'http://localhost:3000',
    });

    return res.status(httpStatus.CREATED).json({ id: session.id });
  } catch (err) {
    next(err);
  }
};
