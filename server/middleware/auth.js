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
      console.error('User not valid');
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
      // This needs to be added directly to the admin in DB
      adminId: res.locals.user.adminId,
      role: res.locals.user.role,
      firstLogin: res.locals.user.firstLogin,
    };

    console.log(userSubset);

    return res
      .status(200)
      .json({ message: 'Login successful', token, userSubset });
  } catch (err) {
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
    if (!decoded.email) {
      return res.status(403).send('Invalid token, user not authenticated');
    }
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
    const adminId = req.body.data.adminId;
    if (!adminId || adminId !== process.env.ADMIN || adminId === undefined) {
      return res.status(403).send('User forbidden');
    }
  } catch (error) {
    return res.status(403).send('Invalid ID');
  }

  return next();
};

module.exports = { generateJWT, validateJWT, checkIdAdmin };
