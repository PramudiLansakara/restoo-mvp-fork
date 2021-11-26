const Joi = require('joi');

module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      note: Joi.string(),
      reservationDate: Joi.date().required(),
      from: Joi.string().required(),
      to: Joi.string().required(),
      personCount: Joi.string().required(),
    },
  },
  updateReservationRequest: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      note: Joi.string(),
      reservationDate: Joi.date().required(),
      from: Joi.string().required(),
      to: Joi.string().required(),
      personCount: Joi.string().required(),
    },
  },
  changeReservationStatus: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      reservationStatus: Joi.string().valid(
        'accepted',
        'declined',
      ).required(),
      adminNote: Joi.string(),
      tableNumber: Joi.string().required(),
    },
  },
  viewReservation: {
    params: {
      id: Joi.objectId().required(),
    },
  },
};
