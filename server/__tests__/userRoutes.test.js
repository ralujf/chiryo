const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const User = require('../models/user');
const userFixture = require('../__fixtures__/user.data.json');

describe('User Routes', () => {
  let token;

  beforeAll(async () => {
    await startServer();
    userFixture.forEach(async (userJSON) => {
      await request(app).post('/api/register').send({
        user: userJSON,
      });
    });

    // Login to get the token
    const loginResponse = await request(app).post('/api/login').send({
      username: userFixture[0].username,
      password: userFixture[0].password,
    });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    setTimeout(() => {
      closeServer();
    }, 6500);
  });

  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        user: {
          username: 'test2',
          email: 'test2@test.com',
          password: 'password',
          age: 20,
          race: 'Black',
          religion: 'Christianity',
          problem: 'Chronic Lethargy',
          firstLogin: true,
        },
      });

    expect(response.status).toBe(302);
  });

  it('should fail to register a user with invalid data format (email wrong)', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        user: {
          username: 'valid-user',
          email: 'invalid-email',
          password: 'validpassword',
          firstLogin: true,
        },
      });

    expect(response.status).toBe(400);
  });

  it('should login a user', async () => {
    const response = await request(app).post('/api/login').send({
      username: userFixture[0].username,
      password: userFixture[0].password,
    });

    expect(response.status).toBe(200);
  });

  it('should fail to login a user with wrong password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: userFixture[5].username, password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });

  it('should fail to login a non-existent user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'nonexistent', password: 'password' });

    expect(response.status).toBe(404);
  });

  it('should delete a user, if it exists', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: userFixture[0].username,
        password: userFixture[0].password,
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Successfully removed account');
  });

  it('should fail to delete a user with wrong password', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: userFixture[1].username, password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });

  it('should fail to delete a non-existent user', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'nonexistent', password: 'password' });

    expect(response.status).toBe(404);
  });

  it('should logout a user', async () => {
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Logout successful');
  });

  it('should fail to logout a user without token', async () => {
    const response = await request(app).post('/api/logout');

    expect(response.status).toBe(500);
  });
});
