const { sendApplication } = require('../controller/applicationController');
const express = require('express');
const router = express.Router();

router.post('/apply', sendApplication);

module.exports = router;
