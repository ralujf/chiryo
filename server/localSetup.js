const bcrypt = require('bcrypt');
const User = require('./models/user');
const Therapist = require('./models/therapist');
const Application = require('./models/application');
const { startServer, closeServer } = require('./index');

const therapistData = require('./__fixtures__/therapists.data.json');
const applicantData = require('./__fixtures__/applicants.data.json');

const hashPasswordAndStore = async (document) => {
  const SALT_ROUNDS = 13;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(document.password, salt);

  document.password = hashedPassword;

  await document.save();
};

const runSetup = async () => {
  try {
    await startServer();

    await Therapist.deleteMany({});
    await Application.deleteMany({});
    await User.deleteMany({});

    for (const therapistJSON of therapistData) {
      const user = new Therapist(therapistJSON);
      await hashPasswordAndStore(user);
    }

    for (const applicantJSON of applicantData) {
      const user = new Application(applicantJSON);
      await hashPasswordAndStore(user);
    }

    const SALT_ROUNDS = 13;

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash('undergrad', salt);

    const adminUser = {
      adminId: process.env.ADMIN,
      username: 'admin',
      email: 'r.fajobi@qmul.ac.uk',
      password: hashedPassword,
      age: '22',
      race: 'N/A',
      religion: 'N/A',
      location: 'N/A',
      additional: 'N/A',
      problem: 'N/A',
      firstLogin: false,
    };

    const admin = new User(adminUser);
    await admin.save();
  } catch (err) {
    console.error('Error during setup: ', err);
  } finally {
    await closeServer();
    console.log('\x1b[33m%s\x1b[0m', 'STATUS: SETUP COMPLETE', '\x1b[0m');
  }
};

runSetup();
