const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Therapist = require('../models/therapist');

/**
 *
 * @param {string} userId
 * @returns
 * @description - Takes in a users details, if it is valid then a JWT returned
 */
const generateJWT = async (req, res) => {
  const username = res.locals.username;
  let user;
  try {
    user = await User.find({ username: username });

    if (!user) {
      user = await Therapist.find({ username: username });
    }

    if (!user) {
      return res.status(404).send(`This user does not exist`);
    }

    const role = user.role;

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).send({ message: 'Login successful', token, role });
  } catch (error) {
    return res.status(500).send(`There was an error ${err}`);
  }
};

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { username } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(403).send('Invalid token, user not authenticated');
  }

  let user;
  try {
    user = await User.find({ username: username });

    if (!user) {
      user = await Therapist.find({ username: username });
    }

    if (!user) {
      return res.status(404).send(`This user does not exist`);
    }

    res.locals.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Cannot find user');
  }
};

const checkIdAdmin = (req, res, next) => {
  const adminID = req.body.adminID;

  if (!adminID || adminID !== process.env.ADMIN) {
    return res.status(403).send('User forbidden');
  }
  return next();
};

module.exports = { generateJWT, validateJWT, checkIdAdmin };
