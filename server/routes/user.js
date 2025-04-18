const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
  updateUser,
  updatePassword,
  setFirstLogin,
} = require('../controller/userController');
const { generateJWT } = require('../middleware/auth');
const router = express.Router();

const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_PASS = 6;

const registrationValidation = [
  body('data.username').exists(),
  body('data.email').isEmail().normalizeEmail(),
  body('data.password').isLength({ min: MIN_LENGTH_PASS }).escape(),
];

const loginValidation = [
  body('data.username').trim().isLength({ min: MIN_LENGTH_NAME }).escape(),
  body('data.password').isLength({ min: MIN_LENGTH_PASS }).escape(),
];

const updateProfileValidation = [
  body('data.username').trim().isLength({ min: MIN_LENGTH_NAME }).escape(),
  body('data.password').isLength({ min: MIN_LENGTH_PASS }).escape(),
  body('data.email').optional().isEmail().normalizeEmail(),
];

const updatePasswordValidation = [
  body('data.username').trim().isLength({ min: MIN_LENGTH_NAME }).escape(),
  body('data.oldPassword').isLength({ min: MIN_LENGTH_PASS }).escape(),
  body('data.newPassword').isLength({ min: MIN_LENGTH_PASS }).escape(),
];

router.post(
  '/register',
  registrationValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser,
);

router.post(
  '/login',
  loginValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginUser,
  generateJWT,
);

router.post('/logout', logoutUser);

router.patch(
  '/update-profile',
  updateProfileValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUser,
);

router.patch('/set-first-login', setFirstLogin);

router.patch(
  '/update-password',
  updatePasswordValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updatePassword,
);

router.delete(
  '/delete-user-account',
  loginValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  deleteUser,
);

module.exports = router;
