const { closeServer, startServer } = require('..');
const {
  calculateCorrelation,
  assertObject,
  matchObject,
} = require('../utils/matchingAlgo');
const therapistFixture = require('../__fixtures__/therapists.data.json');

describe('matching algorithm tests', () => {
  const returnAllTherapists = jest.fn((data) => data);
  let user;

  beforeAll(async () => {
    await startServer();

    user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };
  });

  afterAll(async () => {
    await closeServer();
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

    returnAllTherapists.mockResolvedValue(therapistFixture);

    const result = await matchObject(user);

    expect(result.diagnosis).toBe(user.diagnosis);
    expect(result.matches.length).toBe(0);
  });

  test('matchObject handles no therapists', async () => {
    const user = {
      age: 25,
      race: 'Asian',
      religion: 'None',
      diagnosis: 'Anxiety',
    };

    returnAllTherapists.mockResolvedValue([]);

    const result = await matchObject(user);

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

    returnAllTherapists.mockResolvedValue(therapists);

    const result = await matchObject(user);

    expect(result.diagnosis).toBe(user.diagnosis);
    expect(result.matches.length).toBe(0);
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

    returnAllTherapists.mockResolvedValue(therapists);

    const result = await returnAllTherapists();

    expect(result).toEqual(therapists);
  });
});
