const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const Therapist = require('../models/therapist');
const User = require('../models/user');
const Dashboard = require('../models/dashboard');
const therapistFixture = require('../__fixtures__/therapists.data.json');
const userFixture = require('../__fixtures__/users.data.json');

const SECONDS = 30 * 1000;
jest.setTimeout(SECONDS);

describe('Matching Routes', () => {
  let token;

  beforeAll(async () => {
    await startServer();

    await Promise.all(
      therapistFixture.map(async (therapistJSON) => {
        let therapist = new Therapist(therapistJSON);
        await therapist.save();
      }),
    );

    await Promise.all(
      userFixture.map(async (userJSON) => {
        await request(app).post('/api/register').send({
          data: userJSON,
        });
      }),
    );

    // wait till all users are added to login to get the token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        data: {
          username: userFixture[0].username,
          password: userFixture[0].password,
        },
      });

    token = loginResponse.body.token;
    userId = loginResponse.body.userSubset.userId;
    console.log(loginResponse.body);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Therapist.deleteMany({});
    await Dashboard.deleteMany({});
    await closeServer();
  });

  it('should match user with therapists', async () => {
    const response = await request(app)
      .post('/api/matching/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: { userId: userId },
      });

    expect(response.status).toBe(302);
    expect(response.text).toContain('Found. Redirecting to /dashboard');
  });

  it('should fail due to no JWT when matching user with a therapist', async () => {
    const response = await request(app)
      .post('/api/matching/find-matches')
      .send({
        data: { userId: userId },
      });

    expect(response.status).toBe(403);
    expect(response.text).toContain('Invalid token, user not authenticated');
  });

  it('should fail due to JWT validation, no auth token', async () => {
    const response = await request(app)
      .post('/api/matching/find-matches')
      .set('Authorization', `Bearer Fake Token`)
      .send({
        data: { userId: userId },
      });

    expect(response.status).toBe(403);
    expect(response.text).toContain('Invalid token, user not authenticated');
  });

  it('should fail due to JWT validation, no user', async () => {
    const response = await request(app)
      .post('/api/matching/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId: 0 } });

    expect(response.status).toBe(404);
    expect(response.text).toContain('This user does not exist');
  });

  it('should return no available matches for the user', async () => {
    await Dashboard.deleteMany({});
    await Therapist.deleteMany({});

    const response = await request(app)
      .post('/api/matching/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: { userId: userId },
      });

    expect(response.status).toBe(302);
  });
});
