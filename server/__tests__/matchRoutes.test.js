const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const Therapist = require('../models/therapist');
const User = require('../models/user');
const Dashboard = require('../models/dashboard');
const therapistFixture = require('../__fixtures__/data.json');
const userFixture = require('../__fixtures__/user.data.json');

jest.setTimeout(30000); // These tests are longgg

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
          user: userJSON,
        });
      }),
    );

    // wait till all users are dded to login to get the token
    const loginResponse = await request(app).post('/api/login').send({
      username: userFixture[0].username,
      password: userFixture[0].password,
    });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Therapist.deleteMany({});
    await Dashboard.deleteMany({});
    setTimeout(() => {
      closeServer();
    }, 10000);
  });

  it('should match user with a therapist', async () => {
    const response = await request(app)
      .post('/api/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({ user: userFixture[0], username: userFixture[0].username });

    expect(response.status).toBe(302);
    expect(response.text).toContain('Found. Redirecting to /dashboard');
  });

  it('should fail due to no JWT when matching user with a therapist', async () => {
    const response = await request(app)
      .post('/api/find-matches')
      .send({ user: userFixture[0], username: userFixture[0].username });

    expect(response.status).toBe(403);
    expect(response.text).toContain('Invalid token, user not authenticated');
  });

  it('should fail due to JWT validation, no auth token', async () => {
    const response = await request(app)
      .post('/api/find-matches')
      .set('Authorization', `Bearer Fake Token`)
      .send({ user: userFixture[0], username: userFixture[0].username });

    expect(response.status).toBe(403);
    expect(response.text).toContain('Invalid token, user not authenticated');
  });

  it('should fail due to JWT validation, no user', async () => {
    const response = await request(app)
      .post('/api/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({ user: {}, username: userFixture[0].username });

    expect(response.status).toBe(404);
    expect(response.text).toContain('No user found for this ID');
  });

  it('should return fail due to no available matches for the user', async () => {
    await Dashboard.deleteMany({});
    await Therapist.deleteMany({});

    const response = await request(app)
      .post('/api/find-matches')
      .set('Authorization', `Bearer ${token}`)
      .send({ user: userFixture[0], username: userFixture[0].username });

    expect(response.status).toBe(500);
    expect(response.text).toContain('Unable to return matches');
  });
});
