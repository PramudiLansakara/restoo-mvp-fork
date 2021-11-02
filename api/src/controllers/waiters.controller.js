const User = require('../models/user.model');

exports.getList = async (_req, res, next) => {
  try {
    const waiters = await User.find({ role: 'waiter' });
    return res.status(200).json({ waiterlist: waiters });
  } catch (error) {
    return next(error);
  }
};
