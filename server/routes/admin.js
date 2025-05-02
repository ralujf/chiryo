const {
  findTherapistsExternal,
  viewApplications,
  approveApplication,
  rejectApplication,
} = require('../controller/applicationController');
const express = require('express');
const router = express.Router();

router.put('/search-for-therapist', findTherapistsExternal);

router.put('/view-all-applicants/:offset', viewApplications);

router.post('/approve-applicant', approveApplication);

router.delete('/reject-applicant', rejectApplication);

module.exports = router;
