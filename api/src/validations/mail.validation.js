const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  sendFeedbackMail: {
    body: {
      receiverEmail: Joi.string().email().required(),
      name: Joi.string().required(),
      reservationDate: Joi.date().required(),
      from: Joi.string().required(),
      to: Joi.string().required(),
      personCount: Joi.string().required(),
      tableNumber: Joi.string().required(),
      reservationStatus: Joi.string().valid(
        'accepted',
        'declined',
      ).required(),
      note: Joi.string(),
    },
  },
};
