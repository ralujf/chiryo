const Application = require('../models/application');
const Therapist = require('../models/therapist');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { scrapeTherapists } = require('./scraper');

const sendApplication = async (req, res) => {
  try {
    const applicationInformation = req.body.data;
    console.log(applicationInformation.password);
    if (!applicationInformation.password) {
      return res.status(500).json({ message: 'Incorrect format' + err });
    }

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

const findTherapistsExternal = async (req, res) => {
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
  let parsedOffset = parseInt(offset, 10);

  if (isNaN(parsedOffset)) {
    parsedOffset = 0;
  }

  try {
    const applicants = await Application.find({})
      .skip(parsedOffset)
      .sort({ createdAt: 1 })
      .limit(10)
      .exec();

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

    const result = await Application.findOneAndDelete({
      email: applicationInformation.email,
    });

    if (result) {
      // const adminEmail = 'chiryo.help@gmail.com';

      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: adminEmail,
      //     pass: process.env.ADMINPASS,
      //   },
      // });

      // const mailOptions = {
      //   from: adminEmail,
      //   // Need to remember to turn this off and not actually send to real therapists lol
      //   // to: applicationInformation.email,
      //   subject: 'You are now part of Chiryo!',
      //   text: 'You are now a part of Chiryo! Welcome to the family! For next steps visit the website 🫂',
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return res.status(500).send('An error occurred: ' + error);
      //   } else {
      //     console.log('SENT:' + info.response);
      //    return res.status(200).send('Applicant approved');
      //   }
      // });

      return res.status(201).send('Applicant accepted!');
    }

    return res.status(404).send('Applicant not found');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server side error occurred');
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const applicantEmail = req.body.data;
    const result = await Application.findOneAndDelete({
      email: applicantEmail.email,
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
  sendApplication,
  viewApplications,
  approveApplication,
  rejectApplication,
  findTherapistsExternal,
};
