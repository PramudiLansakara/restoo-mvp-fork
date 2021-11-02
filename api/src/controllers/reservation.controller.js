const httpStatus = require('http-status');
const Reservation = require('../models/reservation.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const result = await Reservation.create(req.body);

    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const reservationRequest = await Reservation.findByIdAndUpdate(id, update);
    if (!reservationRequest) {
      throw new APIError('Reservation Request not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { reservation = null } = req.query;
    const filter = {};
    if (reservation) {
      filter.reservation = reservation;
    }
    const reservations = await Reservation.find(filter).sort('reservationDate').select('-__v');
    return res.status(httpStatus.OK).json({ reservations });
  } catch (err) {
    next(err);
  }
};

exports.viewReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = {
      _id: id,
    };

    const reservation = await Reservation.findOne(filter).select('-__v');

    return res.json({ reservation });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Reservation.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};
