const express = require('express');

const router = express.Router();
const validator = require('express-validation');
const authController = require('../../controllers/auth.controller');
const { create } = require('../../validations/user.validation');
const auth = require('../../middlewares/authorization');

router.post('/register', validator(create), authController.register); // validate and register
router.post('/login', authController.login); // login
router.get('/confirm', authController.confirm);
router.get('/list', validator(authController.listUsers), auth('admin'), authController.listUsers);
router.put('/active/:id', auth('admin'), authController.activateUser);
router.put('/deactive/:id', auth('admin'), authController.deactivateUser);

// Authentication example
router.get('/secret1', auth(), (_req, res) => {
  // example route for auth
  res.json({ message: 'Anyone can access(only authorized)' });
});
router.get('/secret2', auth('admin'), (_req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' });
});
router.get('/secret3', auth('user'), (_req, res) => {
  // example route for auth
  res.json({ message: 'Only user can access' });
});

module.exports = router;
