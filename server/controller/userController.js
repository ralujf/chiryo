const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Therapist = require('../models/therapist');

const registerUser = async (req, res) => {
  const user = req.body.data;

  if (!user) {
    return res.status(400).send('No user data');
  }

  try {
    const existingUser = await User.findOne({ username: user.username }).exec();

    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const SALT_ROUNDS = 13;

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    const newUser = new User(user);
    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).send({ id: newUser._id, token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error registering new user: ' + err);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body.data;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  if (!password) {
    return res.status(400).send('Password is required');
  }

  try {
    let user = await User.findOne({ username: username }).exec();

    if (!user) {
      user = await Therapist.findOne({ username: username }).exec();
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      res.locals.user = user;
      res.locals._id = user.toObject()._id;

      return next();
    } else {
      return res.status(401).send('Authentication failed. Wrong password.');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error during authentication: ' + err);
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send('Authorization header is required');
    }

    res.removeHeader('Authorization');

    return res.status(200).send('Logout successful');
  } catch (err) {
    return res.status(500).send('Error logging out user');
  }
};

const updateUser = async (req, res) => {
  try {
    const userInformation = req.body.data;
    const { username, password } = userInformation;

    let user = await User.findOne({ username }).exec();
    let role = 'user';

    if (!user) {
      user = await Therapist.findOne({ username }).exec();
      role = 'therapist';
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).send('Incorrect password');
    }

    const filteredUserInformation = Object.fromEntries(
      Object.entries(userInformation).filter(([, value]) => value !== ''),
    );

    const updateRes =
      role === 'therapist'
        ? await Therapist.updateOne({ username }, filteredUserInformation)
        : await User.updateOne({ username }, filteredUserInformation);

    if (updateRes.modifiedCount === 0) {
      return res.status(500).send('Failed to update');
    }

    return res.status(200).send('User details updated successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Unable to update information: ' + err);
  }
};

const setFirstLogin = async (req, res) => {
  const { userId, role } = req.body.data;

  if (!userId || !role) {
    return res.status(400).send('Missing userId or role');
  }

  try {
    const user =
      role === 'therapist'
        ? await Therapist.findByIdAndUpdate(userId, {
            firstLogin: false,
          }).exec()
        : await User.findByIdAndUpdate(userId, {
            firstLogin: false,
          }).exec();

    return res.status(200).send('First login status updated successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send(`There was an error: ${err}`);
  }
};

const updatePassword = async (req, res) => {
  const { username, oldPassword, newPassword, role } = req.body.data;

  try {
    const user =
      role === 'therapist'
        ? await Therapist.findOne({ username }).exec()
        : await User.findOne({ username }).exec();

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      const SALT_ROUNDS = 13;

      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(newPassword, salt);

      user.password = hash;

      await user.save();
      return res.status(200).send('Password updated successfully');
    }

    return res
      .status(401)
      .send('There was something wrong with the entered credentials');
  } catch (err) {
    console.error(err);
    return res.status(500).send(`There was an error: ${err}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username, password, role } = req.body.data;

    const user =
      role === 'therapist'
        ? await Therapist.findOne({ username }).exec()
        : await User.findOne({ username }).exec();

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      await (role === 'therapist' ? Therapist : User)
        .deleteOne({ username })
        .exec();

      res.removeHeader('Authorization');
      return res.status(200).send('Successfully removed account');
    }

    return res
      .status(401)
      .send('There was something wrong with the entered credentials');
  } catch (err) {
    console.error(err);
    return res.status(500).send(`There was an error: ${err}`);
  }
};

const viewUser = async (req, res) => {
  const { userId, role } = req.body.data;

  if (!userId) {
    return res.status(400).send('Missing userId or role');
  }

  try {
    const user =
      role === 'therapist'
        ? await Therapist.findById(userId).exec()
        : await User.findById(userId).exec();

    if (!user) {
      return res.status(404).send('User not found');
    }

    const userInfo = {
      username: user.username,
      email: user.email,
      age: user.age,
      race: user.race,
      problem: user?.problem,
    };

    return res.status(200).send({ userInfo });
  } catch (err) {
    console.error(err);
    return res.status(500).send(`There was an error: ${err}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  viewUser,
  updateUser,
  updatePassword,
  setFirstLogin,
};
