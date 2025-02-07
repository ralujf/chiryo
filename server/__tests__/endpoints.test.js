const request = require('supertest');
const app = require('../index');
const User = require('../models/user');
const Application = require('../models/application');
const Therapist = require('../models/therapist');
const Dashboard = require('../models/dashboard');
const jwt = require('jsonwebtoken');

jest.mock('../models/user');
jest.mock('../models/application');
jest.mock('../models/therapist');
jest.mock('../models/dashboard');

describe('Admin Routes', () => {
  it('should handle application submission', async () => {
    Application.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/apply')
      .send({ applicationInformation: { name: 'Test' } });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Application Submitted');
  });

  it('should view all applications', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.find.mockResolvedValueOnce([{ name: 'Test' }]);
    const response = await request(app)
      .get('/api/view-all-applicants')
      .set('Authorization', `Bearer ${token}`)
      .send({ adminID: process.env.ADMIN });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Test' }]);
  });

  it('should approve an application', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    Therapist.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/approve-therapist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        applicationInformation: { _id: '1', name: 'Test' },
        adminID: process.env.ADMIN,
      });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should reject an application', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    const response = await request(app)
      .delete('/api/reject-therapist/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ applicantId: '1', adminID: process.env.ADMIN });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Applicant deleted from system');
  });
});

describe('Dashboard Routes', () => {
  it('should fetch user dashboard', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    Dashboard.find.mockResolvedValueOnce([{ data: 'test' }]);
    const response = await request(app)
      .get('/api/load-user-dashboard/')
      .set('Authorization', `Bearer ${token}`)
      .query({ offset: 1 })
      .send({ userId: '1', role: 'user' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ data: 'test' }]);
  });

  it('should delete a record', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    Dashboard.updateOne.mockResolvedValueOnce({ nModified: 1 });
    const response = await request(app)
      .put('/api/delete-row')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: '1', therapistId: '2' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should delete all records', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    Dashboard.updateMany.mockResolvedValueOnce({ nModified: 1 });
    const response = await request(app)
      .put('/api/delete-table')
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'user', userId: '1' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should update a record', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    Dashboard.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });
    const response = await request(app)
      .put('/api/add-field')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: '1', therapistId: '2', rowData: { data: 'test' } });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Row deleted successfully');
  });

  it('should insert to dashboard', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    User.findById.mockResolvedValueOnce({
      _id: '1',
      username: 'test',
      email: 'test@test.com',
    });
    Dashboard.insertMany.mockResolvedValueOnce([{ data: 'test' }]);
    const response = await request(app)
      .put('/api/add-dashboard-item')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '1',
        matches: [
          {
            _id: '2',
            firstName: 'Test',
            lastName: 'User',
            expertise: 'Test',
            location: 'Test',
          },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Successfully matched');
  });
});

describe('Enrol Routes', () => {
  it('should handle application submission', async () => {
    Application.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/apply')
      .send({ applicationInformation: { name: 'Test' } });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Application Submitted');
  });

  it('should view all applications', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.find.mockResolvedValueOnce([{ name: 'Test' }]);
    const response = await request(app)
      .get('/api/view-all-applicants')
      .set('Authorization', `Bearer ${token}`)
      .send({ adminID: process.env.ADMIN });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Test' }]);
  });

  it('should approve an application', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    Therapist.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/approve-therapist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        applicationInformation: { _id: '1', name: 'Test' },
        adminID: process.env.ADMIN,
      });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should reject an application', async () => {
    const token = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    const response = await request(app)
      .delete('/api/reject-therapist/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ applicantId: '1', adminID: process.env.ADMIN });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Applicant deleted from system');
  });
});

describe('User Routes', () => {
  it('should register a user', async () => {
    User.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/register')
      .send({
        registrationInfo: {
          username: 'test',
          email: 'test@test.com',
          password: 'password',
        },
      });
    expect(response.status).toBe(302);
  });

  it('should login a user', async () => {
    User.findOne.mockResolvedValueOnce({
      username: 'test',
      password: 'password',
      _id: '1',
    });
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'test', password: 'password' });
    expect(response.status).toBe(200);
  });

  it('should logout a user', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Logout successful');
  });

  it('should delete a user', async () => {
    const token = jwt.sign({ id: 'userId' }, process.env.JWT_SECRET);
    User.findOne.mockResolvedValueOnce({
      username: 'test',
      password: 'password',
      deleteOne: jest.fn().mockResolvedValueOnce({}),
    });
    const response = await request(app)
      .delete('/api/delete-user-account')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'test', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Successfully removed account');
  });
});
