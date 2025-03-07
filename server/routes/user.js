const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
  updateUser,
  updatePassword,
} = require('../controller/userController');
const { generateJWT } = require('../middleware/auth');
const router = express.Router();

const registrationValidation = [
  body('data.username').exists(),
  body('data.email').isEmail().normalizeEmail(),
  body('data.password').isLength({ min: 6 }).escape(),
];

const loginValidation = [
  body('data.username').trim().isLength({ min: 3 }).escape(),
  body('data.password').isLength({ min: 6 }).escape(),
];

const updateProfileValidation = [
  body('data.username').trim().isLength({ min: 3 }).escape(),
  body('data.password').isLength({ min: 6 }).escape(),
  body('data.email').optional().isEmail().normalizeEmail(),
];

const updatePasswordValidation = [
  body('data.username').trim().isLength({ min: 3 }).escape(),
  body('data.oldPassword').isLength({ min: 6 }).escape(),
  body('data.newPassword').isLength({ min: 6 }).escape(),
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
