const { fillExternal } = require('../controller/applicationController');
const express = require('express');
const router = express.Router();

router.get('/search-for-therapist', fillExternal);

module.exports = router;
