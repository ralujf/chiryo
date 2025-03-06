const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  login,
  logout,
  register,
  deleteUser,
  updateUserDetails,
} = require('../controller/userController');
const { generateJWT } = require('../middleware/auth');
const router = express.Router();

const registrationValidation = [
  body('data.username').exists(),
  body('data.email').isEmail().normalizeEmail(),
  body('data.password').isLength({ min: 6 }).escape(),
];
// Inputs updated
const loginValidation = [
  body('data.username').trim().isLength({ min: 3 }).escape(),
  body('data.password').isLength({ min: 6 }).escape(),
];

router.post('/logout', logout);

router.post(
  '/login',
  loginValidation,
  (req, res, next) => {
    console.log('Recieved');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login,
  generateJWT,
);

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
  register,
);

// TODO: Testing Required
router.patch('/update', updateUserDetails);

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
