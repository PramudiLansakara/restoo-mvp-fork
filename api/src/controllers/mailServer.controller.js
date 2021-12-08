const httpStatus = require('http-status');
const Email = require('email-templates');
const path = require('path');
const transporter = require('../services/transporter');

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
