const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

let server;
const app = express();
const PORT = process.env.PORT || 3000;

const { validateAdmin, validateInternalJWT } = require('./middleware/auth');

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
app.use(express.static('public'));

// Debugging
app.use('/api', (_, __, next) => {
  console.log('STATUS: Active');
  next();
});

app.use('/api', applicationsRouter);
app.use('/api', userRouter);

app.use('/api/matching', validateInternalJWT, matchRouter);
app.use('/api/dashboard', validateInternalJWT, dashboardRouter);
app.use('/api/admin', validateAdmin, adminRouter);

const startServer = async () => {
  try {
    let mongoUrl;
    if (process.env.NODE_ENV === 'production') {
      mongoUrl = process.env.MONGO_URL;
    } else {
      mongoUrl = process.env.MONGO_TEST;
    }

    try {
      await mongoose.connect(mongoUrl);
    } catch (err) {
      console.error(err);
    }

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
    server.close();
  }
  mongoose.disconnect();
};

// Stop start running automatically in TCs
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, closeServer };
