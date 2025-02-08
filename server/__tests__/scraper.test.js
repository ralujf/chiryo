const scraper = require('../scraper');
const axios = require('axios');
jest.mock('axios');

describe('scraper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data successfully', async () => {
    const mockData = { data: 'mockData' };
    axios.get.mockResolvedValue(mockData);

    const result = await scraper.fetchData('http://example.com');
    expect(result).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith('http://example.com');
  });

  test('should handle fetch data error', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(scraper.fetchData('http://example.com')).rejects.toThrow(
      'Network Error',
    );
    expect(axios.get).toHaveBeenCalledWith('http://example.com');
  });

  test('should process data correctly', () => {
    const data = 'some raw data';
    const processedData = scraper.processData(data);
    expect(processedData).toBe('expected processed data');
  });

  test('should handle empty data in processData', () => {
    const data = '';
    const processedData = scraper.processData(data);
    expect(processedData).toBe('expected result for empty data');
  });

  test('should handle null data in processData', () => {
    const data = null;
    const processedData = scraper.processData(data);
    expect(processedData).toBe('expected result for null data');
  });
});
