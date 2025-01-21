const therapist = require('../models/therapist');
const puppeteer = require('puppeteer');
const link = 'https://www.psychologytoday.com/gb/counselling/eng/london';

const scrapeTherapists = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: 'domcontentload',
  });

  const therapistArray = await page.evaluate(() => {
    const generalInfo = document.querySelectorAll('.results-row.top-divider');

    generalInfo.forEach((info) => {
      const [firstName, lastName] = info
        .querySelector('.profile-title')
        .innerText.split(' ');
      const credentials = info.querySelector(
        'profile-subtitle-credentials',
      ).innerText;
      const expertise = info.querySelector('.statements').innerText;
      const location = info.querySelector('.profile-location').innerText;
      const phoneNumber = info.querySelector('.results-row-phone').innerText;
      const password = process.env.QUANT_KEY;
      const therapist = new Therapist({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      console.log(therapist);
    });
    // Non-required fields
    // const expertise =
    // const age =
    // const race =
    // const background =
    // const religion =
    // const location =
    // const yearsOfExperience =
    // const reviews =
  });

  await page.click('.page-btn.button-element.page-btn');

  await browser.close();

  return therapistArray;
};

export { scrapeTherapists };
