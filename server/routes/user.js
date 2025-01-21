const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  login,
  logout,
  register,
  deleteUser,
} = require('../controller/userController');
const { generateJWT } = require('../middleware/auth');
const router = express.Router();

const registrationValidation = [
  body('username').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).escape(),
];

const loginValidation = [
  body('username').trim().isLength({ min: 3 }).escape(),
  body('password').isLength({ min: 6 }).escape(),
];

router.post('/logout', logout);

router.post(
  '/login',
  loginValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
  },
  login,
  generateJWT,
);

router.post(
  '/register',
  registrationValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
  },
  register,
);

router.delete(
  '/delete-user-account',
  loginValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
  },
  deleteUser,
);

module.exports = router;
