const httpStatus = require('http-status');
const Table = require('../models/table.model');
const APIError = require('../utils/APIError');

exports.create = async (req, res, next) => {
  try {
    const { tableNumber } = req.body;
    const tableNo = await Table.findOne({ tableNumber: { $eq: tableNumber } }).select('tableNumber');
    if (tableNo) {
      throw new APIError('Duplicate Entry', httpStatus.BAD_REQUEST);
    }

    const result = await Table.create(req.body);
    return res.status(httpStatus.CREATED).json({ id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.tableList = async (_req, res, next) => {
  try {
    const tables = await Table.find({}).populate('tables', '_id tableNumber status');
    return res.status(httpStatus.OK).json({ tables });
  } catch (err) {
    next(err);
  }
};

exports.getOneTable = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oneTable = await Table.findOne({ _id: id });
    if (!oneTable) {
      throw new APIError('Table not found', httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json({ oneTable });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const { tableNumber } = req.body;

    const tableId = await Table.findOne({ tableNumber: { $eq: tableNumber } });
    if (tableId && tableId._id.toString() !== id) {
      throw new APIError('Duplicate Entry', httpStatus.BAD_REQUEST);
    }

    const table = await Table.findByIdAndUpdate(id, update);
    if (!table) {
      throw new APIError('Table not found', httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.setAllStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    await Table.updateMany({ status: { $ne: status } }, { $set: { status } });
    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Table.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};
