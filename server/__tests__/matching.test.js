const {
  matchObject,
  calculateCorrelation,
  assertObject,
  returnAllTherapists,
} = require('../utils/matchingAlgo');
jest.mock('../utils/matchingAlgo', () => {
  const originalModule = jest.requireActual('../utils/matchingAlgo');
  return {
    ...originalModule,
    returnAllTherapists: jest.fn(() => require('./data.json')),
  };
});
// Mock the return all therapist anywhere that it is needed

describe('matching algorithm tests', () => {
  let user;

  beforeAll(() => {
    user = {
      _id: 'user1',
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

  test('match object to other objects based on correlation score', async () => {
    const result = await matchObject(user);
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.diagnosis).toBe(user.diagnosis);
  });
});
