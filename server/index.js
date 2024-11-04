const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Routers
const userRouter = require('./routes/user')
const matchRouter = require('./routes/matching')
const dashboardRouter = require('./routes/dashboard')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', userRouter)
app.use('/api', matchRouter)
app.use('/api', dashboardRouter)

// MongoDB connection
const mongoURI = process.env.MONGOURI + `0.0.0.0:27017/chiryo`;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});

