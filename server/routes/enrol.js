const {
  handleApplication,
  viewApplications,
  approveApplication,
  rejectApplication,
} = require('../controller/applicationController');
const { checkIdAdmin } = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/apply', handleApplication);

router.get('/view-all-applicants', checkIdAdmin, viewApplications);

router.post('/approve-therapist', checkIdAdmin, approveApplication);

router.delete('/reject-therapist/:id', checkIdAdmin, rejectApplication);

module.exports = router;
