const { matchUserWithTherapist } = require('../controller/matchController')
const { insertToDashboard } = require('../controller/dashboardController')
const express = require('express')
const router = express.Router()

router.post('/find-matches', matchUserWithTherapist, insertToDashboard)

module.exports = router



