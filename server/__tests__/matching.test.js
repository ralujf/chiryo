const {
  calculateCorrelation,
  assertObject,
  matchObject,
  returnAllTherapists,
} = require('../utils/matchingAlgo');
jest.mock('../utils/matchingAlgo', () => {
  const originalModule = jest.requireActual('../utils/matchingAlgo');
  return {
    ...originalModule,
    returnAllTherapists: jest.fn(),
  };
});
// Mock the return all therapist anywhere that it is needed

describe('matching algorithm tests', () => {
  let user;

  beforeAll(() => {
    user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };
  });

  test('calculating correlation between two objects', () => {
    const objectA = { age: 25, race: 'Asian', religion: 'None' };
    const objectB = { age: 30, race: 'Asian', religion: 'None' };
    const correlation = calculateCorrelation(objectA, objectB);
    expect(correlation).toBeGreaterThan(0);
  });

  test('assert that two objects have the keys and the same types true', () => {
    const objectA = { age: 25, race: 'Asian', religion: 'None' };
    const objectB = { age: 30, race: 'Asian', religion: 'None' };
    const result = assertObject(objectA, objectB);
    expect(result).toBe(true);
  });

  test('assert that two objects have the keys and the same types false', () => {
    const objectA = { age: 25, race: 'Asian', religion: 'None' };
    const objectB = { age: '30', race: 'Asian', religion: 'None' };
    const result = assertObject(objectA, objectB);
    expect(result).toBe(false);
  });

  test('matchObject returns correct matches and diagnosis', async () => {
    const user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };

    const therapists = [
      { age: 30, race: 'Asian', religion: 'None', diagnosis: 'Anxiety' },
      {
        age: 40,
        race: 'Caucasian',
        religion: 'Christian',
        diagnosis: 'Depression',
      },
    ];

    const mockReturnAllTherapists = jest.fn().mockResolvedValue(therapists);

    const result = await matchObject(user, mockReturnAllTherapists);

    expect(result.diagnosis).toBe(user.diagnosis);
    expect(result.matches.length).toBe(2);
  });

  test('matchObject handles no therapists', async () => {
    const user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };

    const mockReturnAllTherapists = jest.fn().mockResolvedValue([]);

    const result = await matchObject(user, mockReturnAllTherapists);

    expect(result.diagnosis).toBe(user.diagnosis);
    expect(result.matches.length).toBe(0);
  });

  test('matchObject handles therapists with missing fields', async () => {
    const user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };

    const therapists = [
      { age: 30, race: 'Asian', religion: 'None' },
      {
        age: 40,
        race: 'Caucasian',
        religion: 'Christian',
        diagnosis: 'Depression',
      },
    ];

    const mockReturnAllTherapists = jest.fn().mockResolvedValue(therapists);

    const result = await matchObject(user, mockReturnAllTherapists);

    expect(result.diagnosis).toBe(user.diagnosis);
    expect(result.matches.length).toBe(2);
  });

  test('returnAllTherapists returns therapist data', async () => {
    const therapists = [
      { age: 30, race: 'Asian', religion: 'None', diagnosis: 'Anxiety' },
      {
        age: 40,
        race: 'Caucasian',
        religion: 'Christian',
        diagnosis: 'Depression',
      },
    ];

    require('../utils/matchingAlgo').returnAllTherapists.mockResolvedValue(
      therapists,
    );

    const result = await returnAllTherapists();

    expect(result).toEqual(therapists);
  });
});
