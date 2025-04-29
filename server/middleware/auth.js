const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Therapist = require('../models/therapist');

/**
 *
 *
 * @returns - 404 if user not found, else 200 Login successful
 * @description - Takes in a users details, if it is valid then a JWT returned
 */
const generateJWT = async (_, res) => {
  try {
    if (!res.locals._id) {
      return res.status(404).send(`This user does not exist`);
    }

    const token = jwt.sign(
      { email: res.locals.user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    const userSubset = {
      userId: res.locals._id,
      username: res.locals.user.username,
      adminId: res.locals.user.adminId,
      role: res.locals.user.role,
      firstLogin: res.locals.user.firstLogin,
    };

    return res.status(200).send({ token, userSubset });
  } catch (err) {
    return res.status(500).send(`There was an error ${err}`);
  }
};

/**
 * Verifies the JWT token and decodes it
 * @param {string} token - The JWT token to verify
 * @returns {object|null} - Decoded token if valid, null otherwise
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

/**
 * Finds a user by username or userId
 * @param {object} query - The query to find the user (username or userId)
 * @returns {object|null} - The user if found, null otherwise
 */
const findUser = async (query) => {
  try {
    let user = await User.findOne(query).exec();

    if (!user) {
      user = await Therapist.findOne(query).exec();
    }

    return user;
  } catch {
    return null;
  }
};

/**
 * Validates the JWT token and user existence
 * @params - req.headers['auth'] token, username on body.data
 * @returns - 403 if token present and not valid, username 404 if token valid and not username is not found, 500 if the user cannot be found at all
 */
const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { username } = req.body.data;

    const decoded = verifyToken(token);

    if (!decoded || !decoded.email) {
      return res.status(403).send('Invalid token, user not authenticated');
    }

    try {
      const user = await findUser({ username });
      if (!user) {
        return res.status(404).send(`This user does not exist`);
      }

      res.locals.user = user;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send('Cannot find user');
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Validates the JWT token and user existence by userId
 * @params - req.headers['auth'] token, userId on body.data
 * @returns - 403 if token present and not valid, userId 404 if token valid and not userId is not found, 500 if the user cannot be found at all
 */
const validateInternalJWT = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { userId } = req.body.data;

    const decoded = verifyToken(token);

    if (!decoded || !decoded.email) {
      return res.status(403).send('Invalid token, user not authenticated');
    }

    try {
      const user = await findUser({ _id: userId });

      if (!user) {
        return res.status(404).send(`This user does not exist`);
      }

      res.locals.user = user;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send('Cannot find user');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const validateAdmin = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { adminId } = req.body.data;

    const decoded = verifyToken(token);

    if (!decoded || !decoded.email) {
      return res.status(403).send('Invalid token, user not authenticated');
    }

    try {
      if (!adminId || adminId !== process.env.ADMIN || adminId === undefined) {
        return res.status(403).send('User forbidden');
      }
    } catch (err) {
      return res.status(403).send('Invalid ID');
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  return next();
};

module.exports = {
  generateJWT,
  validateJWT,
  validateInternalJWT,
  validateAdmin,
};
