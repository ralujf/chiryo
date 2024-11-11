const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Routers
const userRouter = require('./routes/user')
const matchRouter = require('./routes/matching')
const dashboardRouter = require('./routes/dashboard');
const { validateJWT } = require('./utils/auth');

function validUserCheck(req, res, next) { 
    const authToken = req.headers.authorization;
    validateJWT(authToken);
    next();
}
// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', matchRouter)
app.use('/api', validUserCheck, userRouter)
app.use('/api', validUserCheck, dashboardRouter)

// MongoDB connection
const mongoURI = process.env.MONGOURI + `0.0.0.0:27017/chiryo`;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});

