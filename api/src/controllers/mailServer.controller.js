const httpStatus = require('http-status');
const Email = require('email-templates');
const path = require('path');
const transporter = require('../services/transporter');

exports.sendMail = async (req, res, next) => {
  try {
    const {
      receiverEmail, name, reservationDate, from, to, personCount, note,
    } = req.body;
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      preview: false,
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    const response = await email.send({
      template: path.join(__dirname, 'emails', 'reservation'),
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
      },
    });

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    next(err);
  }
};
