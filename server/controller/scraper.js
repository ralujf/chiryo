const puppeteer = require('puppeteer');
const LINK = 'https://www.psychologytoday.com/gb/counselling/eng/london';

const scrapeTherapists = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const TIME_LIMIT = 30000;
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => {
      console.log('\x1b[33m%s\x1b[0m', 'STATUS: SCRAPING COMPLETE', '\x1b[0m');
      resolve(null);
    }, TIME_LIMIT),
  );

  const scrapingPromise = (async () => {
    const page = await browser.newPage();
    await page.goto(LINK, {
      waitUntil: 'domcontentloaded',
    });

    const therapistArray = await page.evaluate(() => {
      const generalInfo = document.querySelectorAll('.results-row.top-divider');
      const therapists = [];

      generalInfo.forEach((info) => {
        const [firstName, lastName] = info
          .querySelector('.profile-title')
          .innerText.split(' ');
        const credentials = info.querySelector(
          '.profile-subtitle-credentials',
        ).innerText;
        const expertise = info.querySelector('.statements').innerText;
        const location = info.querySelector('.profile-location').innerText;
        const phoneNumber = info.querySelector('.results-row-phone').innerText;
        const password = process.env.QUANT_KEY;
        const therapist = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          password: password,
          expertise: expertise,
          location: location,
        };
        therapists.push(therapist);
      });
      console.log(therapists);

      return therapists;
    });

    await page.click('.page-btn.button-element.page-btn');

    return therapistArray;
  })();

  try {
    const result = await Promise.race([scrapingPromise, timeoutPromise]);
    await browser.close();
    return result;
  } catch (error) {
    await browser.close();
    return null;
  }
};

module.exports = { scrapeTherapists };
