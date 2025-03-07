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
        data: userJSON,
      });
    });

    // Login to get the token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        data: {
          username: userFixture[0].username,
          password: userFixture[0].password,
        },
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
        data: {
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

    expect(response.status).toBe(201);
    expect(response.body.id).not.toBe(null);
  });

  it('should fail to register a user with invalid data format (email wrong)', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        data: {
          username: 'valid-user',
          email: 'invalid-email',
          password: 'validpassword',
          firstLogin: true,
        },
      });

    expect(response.status).toBe(400);
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        data: {
          username: userFixture[0].username,
          password: userFixture[0].password,
        },
      });

    expect(response.status).toBe(200);
  });

  it('should fail to login a user with wrong password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        data: {
          username: userFixture[5].username,
          password: 'wrongpassword',
        },
      });

    expect(response.status).toBe(401);
  });

  it('should fail to login a non-existent user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        data: {
          username: 'nonexistent',
          password: 'password',
        },
      });

    expect(response.status).toBe(404);
  });

  it('should update user profile', async () => {
    const response = await request(app)
      .patch('/api/update-profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[0].username,
          password: userFixture[0].password,
          email: 'newemail@test.com',
        },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('User details updated successfully');
  });

  it('should fail to update user profile with wrong password', async () => {
    const response = await request(app)
      .patch('/api/update-profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[0].username,
          password: 'wrongpassword',
          email: 'newemail@test.com',
        },
      });

    expect(response.status).toBe(403);
  });

  it('should update user password', async () => {
    const response = await request(app)
      .patch('/api/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[5].username,
          oldPassword: userFixture[5].password,
          newPassword: 'newpassword',
          role: 'user',
        },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Password updated successfully');
  });

  it('should fail to update user password with wrong old password', async () => {
    const response = await request(app)
      .patch('/api/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[0].username,
          oldPassword: 'wrongpassword',
          newPassword: 'newpassword',
          role: 'user',
        },
      });

    expect(response.status).toBe(401);
  });

  it('should delete a user, if it exists', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[6].username,
          password: userFixture[6].password,
          role: 'user',
        },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Successfully removed account');
  });

  it('should fail to delete a user with wrong password', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: userFixture[1].username,
          password: 'wrongpassword',
          role: 'user',
        },
      });

    expect(response.status).toBe(401);
  });

  it('should fail to delete a non-existent user', async () => {
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          username: 'nonexistent',
          password: 'password',
          role: 'user',
        },
      });

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

    expect(response.status).toBe(400);
  });
});
