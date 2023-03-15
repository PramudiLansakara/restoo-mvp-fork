const httpStatus = require('http-status');
const Email = require('email-templates');
const path = require('path');
const transporter = require('../services/transporter');
const {
  username,
} = require('../config').transporter;

exports.sendFeedbackMail = async (req, res, next) => {
  try {
    const {
      receiverEmail, name, reservationDate, from, to, personCount, note, reservationStatus,
      tableNumber,
    } = req.body;
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      preview: false,
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    if (reservationStatus === 'declined') {
      const response = await email.send({
        template: path.join(__dirname, 'emails', 'reservationRejected'),
        message: {
          from: 'info@pizzaservice-mgs.de',
          to: receiverEmail,
        },
        locals: {
          name,
          reservationDate: reservationDate.toISOString().slice(0, 10),
          from,
          to,
          personCount,
          note,
          reservationStatus,
        },
      });
      return res.status(httpStatus.OK).json({ message: response });
    }

    const response = await email.send({
      template: path.join(__dirname, 'emails', 'reservationAccepted'),
      message: {
        from: 'info@pizzaservice-mgs.de',
        to: receiverEmail,
      },
      locals: {
        name,
        reservationDate: reservationDate.toISOString().slice(0, 10),
        from,
        to,
        personCount,
        note,
        tableNumber,
      },
    });

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    next(err);
  }
};

exports.placedOrderMail = async (req, res, next) => {
  try {
    const {
      orderType, items, status, note, customer, total, discount, reference, placedAt,
      deliveryCharge,
    } = req.body;
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      preview: false,
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    const response = await email.send({
      template: path.join(__dirname, 'emails', 'placedOrder'),
      message: {
        from: username,
        to: '"senderNameSameLikeTheZohoOne"info@pizzaservice-mgs.de',
      },
      locals: {
        orderType,
        customer,
        total,
        reference,
        placedAt: new Date(placedAt).toISOString().slice(0, 10),
        items,
        status,
        note,
        discount,
        deliveryCharge,
      },
    });

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    next(err);
  }
};

exports.orderStatusMail = async (req, res, next) => {
  try {
    const {
      orderType, total, note,
      status,
      customer,
      adminNote,
      reference,
      acceptedAt,
      cancelledAt,
      placedAt,
      discount,
      deliveryCharge,
      items,
    } = req.body;
    const customerMail = customer.email;
    // console.log(customer.email)
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      preview: false,
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    if (status === 'declined') {
      const response = await email.send({
        template: path.join(__dirname, 'emails', 'rejectOrder'),
        message: {
          from: username,
          to: customerMail,
        },
        locals: {
          customer,
          status,
          orderType,
          total,
          note,
          adminNote,
          reference,
          placedAt: new Date(placedAt).toISOString().slice(0, 10),
          cancelledAt: new Date(cancelledAt).toISOString().slice(0, 10),
          discount,
          deliveryCharge,
          items,
        },
      });
      return res.status(httpStatus.OK).json({ message: response });
    }

    const response = await email.send({
      template: path.join(__dirname, 'emails', 'acceptOrder'),
      message: {
        from: username,
        to: customerMail,
      },
      locals: {
        customer,
        status,
        orderType,
        total,
        note,
        reference,
        placedAt: new Date(placedAt).toISOString().slice(0, 10),
        acceptedAt: new Date(acceptedAt).toISOString().slice(0, 10),
        discount,
        deliveryCharge,
        items,
      },
    });

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    next(err);
  }
};
