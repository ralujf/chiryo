const Application = require('../models/application');
const Therapist = require('../models/therapist');
const { scrapeTherapists } = require('./scraper');

const handleApplication = async (req, res) => {
  try {
    const { applicationInformation } = req.body;
    const application = new Application(applicationInformation);
    await application.save();
    console.error('Error saving application:', err);
    return res.status(200).send('Application Submitted');
  } catch (err) {
    return res.status(500).send('Save failed' + err);
  }
};

const fillExternal = async (req, res) => {
  try {
    const arr = await scrapeTherapists();
    arr.forEach((therapist) => therapist.save());
    return res.status(201).send('Therapists successfully added');
  } catch (err) {
    return res.status(500).send('Scrape failed' + err);
  }
};

const viewApplications = async (req, res, next) => {
  try {
    const therapists = await Application.find().sort({ createdAt: 1 }).exec();
    return res.status(200).json(therapists);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server side error occurred');
  }
};

const approveApplication = async (req, res, next) => {
  try {
    const { applicationInformation } = req.body;
    const therapist = new Therapist(applicationInformation);
    await therapist.save();

    await Application.findByIdAndDelete(applicationInformation._id);
    return res.status(201).send('Applicant accepted!');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server side error occurred');
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const { applicantId } = req.body;
    const result = await Application.findByIdAndDelete(applicantId);

    if (!result) {
      return res.status(404).send('Applicant not found');
    }
    return res.status(200).send('Applicant deleted from system');
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send('Server was unable to delete user from database');
  }
};

module.exports = {
  handleApplication,
  viewApplications,
  approveApplication,
  rejectApplication,
  fillExternal,
};
