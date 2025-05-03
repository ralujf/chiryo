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

router.post('/approve-applicant/:offset', approveApplication, viewApplications);

router.delete('/reject-applicant/:offset', rejectApplication, viewApplications);

module.exports = router;
