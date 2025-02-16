const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Routers
const applicationsRoute = require('./routes/enrol');
const userRouter = require('./routes/user');
const matchRouter = require('./routes/matching');
const dashboardRouter = require('./routes/dashboard');

// Middleware
const { validateJWT } = require('./middleware/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', applicationsRoute);
app.use('/api', userRouter);
app.use('/api', validateJWT, matchRouter);
app.use('/api', validateJWT, dashboardRouter);

const startServer = async () => {
  if (process.env.NODE_ENV === 'production') {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));
  } else {
    mongoose
      .connect(process.env.MONGO_TEST)
      .then(() => console.log('MongoDB connected to test'))
      .catch((err) => console.log(err));
  }
};

const closeServer = async () => {
  mongoose.disconnect();
};

startServer();

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

module.exports = { app, startServer, closeServer };
