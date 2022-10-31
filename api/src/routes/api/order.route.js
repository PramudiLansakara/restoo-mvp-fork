const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/order.controller');
const validations = require('../../validations/order.validation');

router.post('/new', validator(validations.placeOrder), controller.placeOrder);

router.get('/list', validator(validations.listOrders), auth('waiter', 'admin'), controller.listOrders);

router.get('/ordersreport', validator(validations.ordersReport), auth('waiter', 'admin'), controller.ordersReport);

router.get('/list/my', validator(validations.listMyOrders), auth('user'), controller.listMyOrders);

router.get('/:id', validator(validations.viewMyOrder), controller.viewOrder);

router.put('/:id', validator(validations.update), controller.update);

router.put('/:id/status', validator(validations.changeOrderStatus), auth('waiter', 'admin'), controller.changeOrderStatus);

router.put('/:id/selfassign', validator(validations.selfAssignWaiter), auth('waiter'), controller.selfAssignWaiter);

module.exports = router;
