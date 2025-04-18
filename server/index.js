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

// Debugging
app.use('/api', (_, __, next) => {
  console.log('STATUS: Active');
  next();
});

app.use('/api', applicationsRouter);
app.use('/api', userRouter);

app.use('/api/admin', validateJWT, checkIdAdmin, adminRouter);
app.use('/api/matching', validateJWT, matchRouter);
app.use('/api/dashboard', validateJWT, dashboardRouter);

let server;

const startServer = async () => {
  try {
    let mongoUrl;
    if (process.env.NODE_ENV === 'production') {
      mongoUrl = process.env.MONGO_URL;
    } else {
      mongoUrl = process.env.MONGO_TEST;
    }

    await mongoose.connect(mongoUrl);

    if (process.env.NODE_ENV === 'production') {
      console.log('MongoDB connected to production');
    } else {
      console.log('MongoDB connected to test');
    }

    if (process.env.NODE_ENV !== 'test') {
      mongoose.connection.on('error', (err) => {
        console.error(err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('The server is disconnected');
      });
    }

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const closeServer = async () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
    });
  }
  mongoose.disconnect();
};

// Stop start running automatically in TCs
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, closeServer };
