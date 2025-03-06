const bcrypt = require('bcrypt');
const User = require('../models/user');
const Therapist = require('../models/therapist');

const register = async (req, res) => {
  const user = req.body.user;

  try {
    const saltRounds = 13;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    const newUser = new User(user);
    await newUser.save();

    return res.redirect('/login');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error registering new user: ' + err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

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
      res.locals.username = user.username;
      res.locals._id = user.toObject()._id;
      console.log('ID of logged in user: ' + res.locals._id);
      return next();
    } else {
      return res.status(401).send('Authentication failed. Wrong password.');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error during authentication: ' + err);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    return res.status(200).send('Logout successful');
  } catch (err) {
    return res.status(500).send('Error logging out user');
  }
};
// TODO: Requires test cases
const updateUserDetails = async (req, res) => {
  const { userInformation } = req.body;
  const { username, password } = userInformation;

  try {
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

    const updateRes =
      role === 'therapist'
        ? await Therapist.updateOne({ username }, userInformation)
        : await User.updateOne({ username }, userInformation);

    if (updateRes.modifiedCount === 0) {
      return res.status(500).send('Failed to update');
    }

    return res.status(200).send('User details updated successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Unable to update information: ' + err);
  }
};

const deleteUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (role === 'therapist') {
    try {
      const user = await Therapist.findOne({ username: username }).exec();
      if (!user) {
        return res.status(404).send('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        await Therapist.deleteOne(user).exec();
        return res.status(200).send('Successfully removed account');
      }

      return res
        .status(401)
        .send('There was something wrong with the entered credentials');
    } catch (err) {
      console.error(err);
      return res.status(500).send(`There was an error: ${err}`);
    }
  } else if (role === 'user') {
    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        return res.status(404).send('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        await User.deleteOne(user).exec();
        return res.status(200).send('Successfully removed account');
      }

      return res
        .status(401)
        .send('There was something wrong with the entered credentials');
    } catch (err) {
      console.error(err);
      return res.status(500).send(`There was an error: ${err}`);
    }
  }
};

module.exports = { register, login, logout, deleteUser, updateUserDetails };
