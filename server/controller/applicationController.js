const Application = require('../models/application');
const Therapist = require('../models/therapist');
const bcrypt = require('bcrypt');
const { scrapeTherapists } = require('./scraper');

const handleApplication = async (req, res) => {
  try {
    const { applicationInformation } = req.body.data;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(applicationInformation.password, salt);
    applicationInformation.password = hash;

    const application = new Application(applicationInformation);
    await application.save();
    return res.status(200).send('Application Submitted');
  } catch (err) {
    return res.status(500).json({ message: 'Incorrect format' + err });
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
  const { offset = 0 } = req.params;

  const parsedOffset = parseInt(offset, 10);

  if (isNaN(parsedOffset)) {
    return res.status(400).send('Invalid offset value');
  }

  try {
    const applicants = await Application.find({})
      .skip(offset)
      .sort({ createdAt: 1 })
      .limit(10)
      .exec();
    console.log(applicants);
    return res.status(200).json({ data: applicants, total: applicants.length });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server side error occurred');
  }
};

const approveApplication = async (req, res, next) => {
  try {
    const { applicationInformation } = req.body.data;
    const therapist = new Therapist(applicationInformation);
    await therapist.save();

    await Application.findOneAndDelete({ email: applicationInformation.email });
    return res.status(201).send('Applicant accepted!');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server side error occurred');
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const { applicantEmail } = req.body.data;
    const result = await Application.findOneAndDelete({
      email: applicantEmail,
    });

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
