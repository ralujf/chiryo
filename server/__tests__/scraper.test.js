const scraper = require('../controller/scraper');
const puppeteer = require('puppeteer');

jest.mock('puppeteer');

describe('scraper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should scrape therapists successfully', async () => {
    const mockPage = {
      goto: jest.fn(),
      evaluate: jest.fn().mockResolvedValue([
        {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '1234567890',
          password: 'test_password',
          expertise: 'Anxiety',
          location: 'London',
        },
      ]),
      click: jest.fn(),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    puppeteer.launch.mockResolvedValue(mockBrowser);

    const result = await scraper.scrapeTherapists();
    expect(result).toEqual([
      {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        password: 'test_password',
        expertise: 'Anxiety',
        location: 'London',
      },
    ]);
    expect(mockBrowser.newPage).toHaveBeenCalled();
    expect(mockPage.goto).toHaveBeenCalledWith(expect.any(String), {
      waitUntil: 'domcontentloaded',
    });
    expect(mockPage.evaluate).toHaveBeenCalled();
    expect(mockPage.click).toHaveBeenCalledWith(
      '.page-btn.button-element.page-btn',
    );
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  test('should handle error during scraping', async () => {
    puppeteer.launch.mockRejectedValue(new Error('Failed to launch browser'));

    await expect(scraper.scrapeTherapists()).rejects.toThrow(
      'Failed to launch browser',
    );
  });
});
