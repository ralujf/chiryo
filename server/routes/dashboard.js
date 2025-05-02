const {
  fetchDashboard,
  deleteRecord,
  deleteAllRecords,
  updateRecord,
  insertToDashboard,
} = require('../controller/dashboardController');
const express = require('express');
const router = express.Router();

router.put('/load-user-dashboard/:offset', fetchDashboard);

router.put('/delete-row', deleteRecord);

router.put('/delete-table', deleteAllRecords);

router.put('/add-field', updateRecord);

router.put('/add-dashboard-item', insertToDashboard);

module.exports = router;
