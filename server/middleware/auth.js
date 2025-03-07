const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Therapist = require('../models/therapist');

/**
 *
 *
 * @returns - 404 if user not found, else 200 Login successful
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

/**
 *
 * @params - req.headers['auth'] token, username on body.data
 * @returns - 403 if token present and not valid, username 404 if token valid and not username is not found, 500 if the user cannot be found at all
 * @description - Takes in a users details, if it is valid then a JWT returned
 */
const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { username } = req.body.data;
  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(403).send('Invalid token, user not authenticated');
  }

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
  try {
    const adminID = req.body.data.adminID;
    if (!adminID || adminID !== process.env.ADMIN || adminID === undefined) {
      return res.status(403).send('User forbidden');
    }
  } catch (error) {
    return res.status(403).send('Invalid ID');
  }

  return next();
};

module.exports = { generateJWT, validateJWT, checkIdAdmin };
