const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const auth = require('../../middlewares/authorization');
const controller = require('../../controllers/table.controller');
const validations = require('../../validations/table.validation');

router.post('/', auth('admin'), validator(validations.create), controller.create);
router.get('/list', controller.tableList);
router.get('/:id',validator(validations.getOneTable), controller.getOneTable);
router.put('/update/:id', auth('admin'), validator(validations.update), controller.update);
router.put('/alltablestatus', auth('admin'), validator(validations.setAllStatus), controller.setAllStatus);
router.delete('/:id', auth('admin'), validator(validations.delete), controller.delete);


module.exports = router;
