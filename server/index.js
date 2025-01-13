const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Routers
const applicationsRoute = require('./routes/enrol')
const userRouter = require('./routes/user')
const matchRouter = require('./routes/matching')
const dashboardRouter = require('./routes/dashboard');
const { validateJWT } = require('./utils/auth');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', applicationsRoute)
app.use('/api', userRouter)
app.use('/api', validateJWT, matchRouter)
app.use('/api', validateJWT, dashboardRouter)

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

mongoose.connection.on('error', (err) => {
    console.error(err)
})

mongoose.connection.on('disconnected', () => {
    console.log('The server is disconnected')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

