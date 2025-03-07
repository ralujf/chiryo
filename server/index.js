const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const { validateJWT, checkIdAdmin } = require('./middleware/auth');

// Routers
const adminRouter = require('./routes/admin');
const applicationsRouter = require('./routes/enrol');
const userRouter = require('./routes/user');
const matchRouter = require('./routes/matching');
const dashboardRouter = require('./routes/dashboard');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', (req, res, next) => {
  console.log('STATUS: Active');
  next();
});

app.post('/check', (req, res, next) => {
  return res.status(200).send({
    message: 'SUCCESS',
    id: 'CHECK',
  });
});

app.use('/api', applicationsRouter);
app.use('/api', userRouter);

app.use('/api/admin', checkIdAdmin, adminRouter);

app.use('/api/matching', validateJWT, matchRouter);
app.use('/api/dashboard', validateJWT, dashboardRouter);

const startServer = async () => {
  if (process.env.NODE_ENV === 'production') {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));
  } else {
    await mongoose
      .connect(process.env.MONGO_TEST)
      .then(() => console.log('MongoDB connected to test'))
      .catch((err) => console.log(err));
  }
};

const closeServer = async () => {
  mongoose.disconnect();
};

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection.on('error', (err) => {
    console.error(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('The server is disconnected');
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

module.exports = { app, startServer, closeServer };
