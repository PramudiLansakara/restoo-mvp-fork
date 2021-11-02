const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/reservation.controller');
const validations = require('../../validations/reservation.validation');

router.post('/new', validator(validations.create), controller.create);

router.put('/:id/status', validator(validations.changeReservationStatus), auth('admin'), controller.update);

router.put('/:id/update', validator(validations.updateReservationRequest), auth('admin'), controller.update);

router.get('/list', controller.list);

router.delete('/:id', auth('admin'), controller.delete);

router.get('/:id', validator(validations.viewReservation), controller.viewReservation);

module.exports = router;
