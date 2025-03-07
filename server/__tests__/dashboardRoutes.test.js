const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const Dashboard = require('../models/dashboard');
const User = require('../models/user');
const Therapist = require('../models/therapist');
const jwt = require('jsonwebtoken');
const therapistFixture = require('../__fixtures__/data.json');
const userFixture = require('../__fixtures__/user.data.json');

describe('Dashboard Routes', () => {
  let token;
  let userId;
  let therapistId;
  let user;

  beforeAll(async () => {
    await startServer();

    user = new User(userFixture[0]);
    await user.save();
    userId = user._id;
    userEmail = user.email;
    token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET);

    const therapist = new Therapist(therapistFixture[0]);
    await therapist.save();
    therapistId = therapist._id;
    console.error(therapistId);
    console.error(userId);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Therapist.deleteMany({});
    await Dashboard.deleteMany({});
    setTimeout(() => {
      closeServer();
    }, 6500);
  });

  it('should fetch user dashboard', async () => {
    const dashboardItem = new Dashboard({
      user: { _id: userId },
      therapist: { _id: therapistId },
      location: 'London',
      time: new Date(),
      diagnosis: 'test',
    });
    await dashboardItem.save();

    const response = await request(app)
      .get('/api/dashboard/load-user-dashboard/0')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId, role: 'user' } });

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should fail to fetch user dashboard with invalid offset', async () => {
    const response = await request(app)
      .get('/api/dashboard/load-user-dashboard/invalid')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId, role: 'user' } });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid offset value');
  });

  it('should delete a record', async () => {
    const dashboardItem = new Dashboard({
      user: { _id: userId },
      therapist: { _id: therapistId },
      location: 'London',
      time: new Date(),
      diagnosis: 'test',
    });
    await dashboardItem.save();

    const response = await request(app)
      .put('/api/dashboard/delete-row')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId, therapistId } });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should fail to delete due to non-existent userId', async () => {
    const response = await request(app)
      .put('/api/dashboard/delete-row')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId: '67b9904733b91379fcb743ae', therapistId } });

    expect(response.status).toBe(404);
    expect(response.text).toBe('No records found to update');
  });

  it('should fail to delete a non-existent record due to invalid userId', async () => {
    const response = await request(app)
      .put('/api/dashboard/delete-row')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { userId: 'nonexistent', therapistId } });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid ObjectId');
  });

  it('should delete all records', async () => {
    const dashboardItem = new Dashboard({
      user: { _id: userId },
      therapist: { _id: therapistId },
      location: 'London',
      time: new Date(),
      diagnosis: 'test',
    });
    await dashboardItem.save();

    const response = await request(app)
      .put('/api/dashboard/delete-table')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { role: 'user', userId } });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should fail to delete all records for non-existent user', async () => {
    const response = await request(app)
      .put('/api/dashboard/delete-table')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { role: 'user', userId: 'nonexistent' } });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid ObjectId');
  });

  it('should fail to delete all records for non-existent user', async () => {
    const response = await request(app)
      .put('/api/dashboard/delete-table')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { role: 'user', userId: '67b9904733b91379fcb743ae' } });

    expect(response.status).toBe(404);
    expect(response.text).toBe('No records found to update');
  });

  it('should update a record', async () => {
    const dashboardItem = new Dashboard({
      user: { _id: userId },
      therapist: { _id: therapistId },
      location: 'London',
      time: new Date(),
      diagnosis: 'test',
    });
    await dashboardItem.save();

    const response = await request(app)
      .put('/api/dashboard/add-field')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: { userId, therapistId, rowData: { diagnosis: 'updated' } },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Row deleted successfully');
  });

  it('should fail to update a non-existent record', async () => {
    const response = await request(app)
      .put('/api/dashboard/add-field')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          userId: 'nonexistent',
          therapistId,
          rowData: { diagnosis: 'updated' },
        },
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid ObjectId');
  });

  it('should fail to update a non-existent but valid objectId', async () => {
    const response = await request(app)
      .put('/api/dashboard/add-field')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          userId: '67b9904733b91379fcb743ae',
          therapistId,
          rowData: { diagnosis: 'updated' },
        },
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe('No row found');
  });
});
