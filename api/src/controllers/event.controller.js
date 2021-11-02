const httpStatus = require('http-status');
const Event = require('../models/event.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const result = await Event.create(req.body);

    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const event = await Event.findByIdAndUpdate(id, update);
    if (!event) {
      throw new APIError('Event not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Event.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { event = null } = req.query;
    const filter = {};
    if (event) {
      filter.event = event;
    }
    const events = await Event.find(filter).sort('date').select('-__v');
    return res.status(httpStatus.OK).json({ events });
  } catch (err) {
    next(err);
  }
};

exports.viewEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = {
      _id: id,
    };

    const event = await Event.findOne(filter).select('-__v');

    return res.json({ event });
  } catch (err) {
    next(err);
  }
};
