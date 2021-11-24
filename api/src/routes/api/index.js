const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const waitersRouter = require('./waiters.route');
const foodCategoryRouter = require('./food/category.route');
const foodItemRouter = require('./food/item.route');
const orderRouter = require('./order.route');
const eventsRouter = require('./events.route');
const imageRouter = require('./images.route');
const reservationRouter = require('./reservations.route');
const tablesRouter = require('./tables.route');
const paymentRouter = require('./payment.route');

router.get('/status', (_req, res) => {
  res.send({ status: 'OK' });
}); // api status

router.use('/auth', authRouter); // mount auth paths

router.use('/waiters', waitersRouter); // mount auth paths

router.use('/food/category', foodCategoryRouter);

router.use('/food/item', foodItemRouter);

router.use('/order', orderRouter);

router.use('/events', eventsRouter);

router.use('/images', imageRouter);

router.use('/reservations', reservationRouter);

router.use('/table', tablesRouter);

router.use('/payment', paymentRouter);

module.exports = router;
