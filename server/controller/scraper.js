const puppeteer = require('puppeteer');
const LINK = 'https://www.psychologytoday.com/gb/counselling/eng/london';

const scrapeTherapists = async () => {
  const LIMIT = 150;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 0,
    timeout: 600000,
    args: ['--enable-logging', '--v=1'],
  });

  try {
    const page = await browser.newPage();

    try {
      await page.goto(LINK, {
        waitUntil: 'domcontentloaded',
      });
    } catch (error) {
      console.error(error);
    }

    let therapistArray = [];
    let hasNextPage = true;

    while (hasNextPage) {
      await page.waitForSelector('.results-row');

      const therapists = await page.evaluate(() => {
        const generalInfo = document.querySelectorAll('.results-row');
        const therapists = [];

        generalInfo.forEach((info) => {
          const titleElement = info.querySelector('.profile-title');
          const credentialsElement = info.querySelector(
            '.profile-subtitle-credentials',
          );
          const expertiseElement = info.querySelector('.statements');
          const locationElement = info.querySelector('.profile-location');
          const phoneElement = info.querySelector('.results-row-phone');

          if (
            titleElement &&
            credentialsElement &&
            expertiseElement &&
            locationElement &&
            phoneElement
          ) {
            const [firstName, lastName] = titleElement.innerText.split(' ');
            const credentials = credentialsElement.innerText;
            const expertise = expertiseElement.innerText;
            const location = locationElement.innerText;
            const phoneNumber = phoneElement.innerText;

            therapists.push({
              firstName,
              lastName,
              phoneNumber,
              credentials,
              expertise,
              location,
            });
          }
        });

        return therapists;
      });

      if (therapistArray.length >= LIMIT) {
        return therapistArray;
      }

      therapistArray = therapistArray.concat(therapists);

      console.log(therapistArray);

      const nextPageButton = await page.$('.page-btn.button-element.page-btn');

      if (nextPageButton) {
        await nextPageButton.click();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        hasNextPage = false;
      }
    }

    await browser.close();
    return therapistArray;
  } catch (error) {
    console.error(error);
    await browser.close();
    return null;
  }
};

module.exports = { scrapeTherapists };
