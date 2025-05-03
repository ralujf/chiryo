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

router.put('/delete-row/:offset', deleteRecord, fetchDashboard);

router.put('/delete-table/:offset', deleteAllRecords, fetchDashboard);

router.put('/add-field/:offset', updateRecord, fetchDashboard);

router.put('/add-dashboard-item', insertToDashboard);

module.exports = router;
