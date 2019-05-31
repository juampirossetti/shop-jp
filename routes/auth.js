const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password', 'Please enter a password with only numbers and text and at least 5 characters')
    .isAlphanumeric()
    .isLength({ min: 5 })
    .trim(),
  authController.postLogin,
);

router.post(
  '/signup',
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-mail already in use. Please pick up another one!');
        }
      });
    }),
  body('password', 'Please enter a password with only numbers and text and at least 5 characters')
    .isAlphanumeric()
    .isLength({ min: 5 })
    .trim(),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  authController.postSignup,
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
