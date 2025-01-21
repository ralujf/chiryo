const {
  fetchDashboard,
  deleteRecord,
  deleteAllRecords,
  updateRecord,
  insertToDashboard,
} = require('../controller/dashboardController');
const express = require('express');
const router = express.Router();

router.get('/load-user-dashboard', fetchDashboard);

router.put('/delete-row', deleteRecord);

router.put('/delete-table', deleteAllRecords);

router.put('/add-field', updateRecord);

router.put('/add-dashboard-item', insertToDashboard);

// TODO: Create the same things for the therapists

module.exports = router;
