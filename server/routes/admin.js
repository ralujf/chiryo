const {
  findTherapistsExternal,
  viewApplications,
  approveApplication,
  rejectApplication,
} = require('../controller/applicationController');
const express = require('express');
const router = express.Router();

router.get('/search-for-therapist', findTherapistsExternal);

router.get('/view-all-applicants', viewApplications);

router.post('/approve-applicant', approveApplication);

router.delete('/reject-applicant', rejectApplication);

module.exports = router;
