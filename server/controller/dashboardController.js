const mongoose = require('mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/user');

const fetchDashboard = async (req, res) => {
  const { offset = 0 } = req.params;
  const { userId, role } = req.body.data;
  const LIMIT = 10;
  const parsedOffset = parseInt(offset, 10);

  if (isNaN(parsedOffset)) {
    return res.status(400).send('Invalid offset value');
  }

  if (!userId) {
    return res.status(400).send('Invalid userId');
  }

  if (role === 'therapist') {
    query = { 'therapist._id': userId };
  } else if (role === 'user') {
    query = { 'user._id': userId };
  } else {
    return res.status(400).send('Invalid user role');
  }

  try {
    const totalRecords = await Dashboard.countDocuments(query).exec();
    const rows = await Dashboard.find(query).skip(offset).limit(LIMIT).exec();
    console.log(rows);
    return res
      .status(200)
      .send({ data: rows, total: Math.ceil(totalRecords / LIMIT) });
  } catch (err) {
    return res.status(500).send('An error occurred with the submitted ID');
  }
};

const deleteRecord = async (req, res, next) => {
  const { userId, therapistId } = req.body.data;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(therapistId)
    ) {
      return res.status(400).send('Invalid ObjectId');
    }

    const result = await Dashboard.updateOne(
      {
        'user._id': userId,
        'therapist._id': therapistId,
      },
      { $set: { 'user._id': null, 'therapist._id': null } },
    );

    if (result.modifiedCount > 0) {
      return next();
    } else {
      return res.status(404).send('No records found to update');
    }
  } catch (err) {
    console.error('Error updating records:', err);
    return res.status(500).send('An error occurred while updating records');
  }
};

const deleteAllRecords = async (req, res, next) => {
  try {
    const { role, userId } = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid ObjectId');
    }

    let query;

    if (role === 'therapist') {
      query = { 'therapist._id': userId };
    } else if (role === 'user') {
      query = { 'user._id': userId };
    } else {
      return res.status(400).send('Invalid user role');
    }

    const result = await Dashboard.updateMany(query, {
      $set: { 'user._id': null, 'therapist._id': null },
    });

    if (result.modifiedCount > 0) {
      return next();
    } else {
      return res.status(404).send('No records found to update');
    }
  } catch (err) {
    console.error('Error updating records:', err);
    return res.status(500).send('An error occurred while updating records');
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const { userId, therapistId, rowData } = req.body.data;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(therapistId)
    ) {
      return res.status(400).send('Invalid ObjectId');
    }

    const result = await Dashboard.updateOne(
      {
        'user._id': userId,
        'therapist._id': therapistId,
      },
      { $set: { ...rowData } },
    );

    if (result.modifiedCount === 1) {
      return next();
    }

    return res.status(404).send('No row found');
  } catch (err) {
    return res.status(500).send('An error occurred with the submitted ID');
  }
};

const insertToDashboard = async (req, res) => {
  try {
    const { userId } = req.body.data;
    const { data } = res.locals;

    const currentUser = await User.findById(userId).exec();

    if (!data) {
      return res.status(500).send('Unable to complete matching');
    }

    if (!currentUser) {
      return res.status(404).send('There was no user for the ID');
    }

    const dashboardData = await data.matches.map((therapist) => ({
      user: {
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
      },
      therapist: {
        _id: therapist._id,
        username: therapist.username,
        firstName: therapist.firstName,
        lastName: therapist.lastName,
        expertise: therapist.expertise,
      },
      location: therapist.location || 'virtual',
      locationLink: '',
      time: new Date(),
      diagnosis: data.diagnosis,
      markResolvedUser: therapist.markResolvedUser || false,
      markResolvedTherapist: therapist.markResolvedTherapist || false,
    }));

    await Dashboard.insertMany(dashboardData);
    return res.status(201).send('Matches successfully inserted');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Something went wrong!');
  }
};

module.exports = {
  fetchDashboard,
  deleteRecord,
  deleteAllRecords,
  updateRecord,
  insertToDashboard,
};
