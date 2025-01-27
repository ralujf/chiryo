const request = require('supertest');
const app = require('../index');
const { User } = require('../models/user');
const { Application } = require('../models/application');
const { Therapist } = require('../models/therapist');
const { Dashboard } = require('../models/dashboard');

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
    Application.find.mockResolvedValueOnce([{ name: 'Test' }]);
    const response = await request(app).get('/api/view-all-applicants');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Test' }]);
  });

  it('should approve an application', async () => {
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    Therapist.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/approve-therapist')
      .send({ applicationInformation: { _id: '1', name: 'Test' } });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should reject an application', async () => {
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    const response = await request(app)
      .delete('/api/reject-therapist/1')
      .send({ applicantId: '1' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Applicant deleted from system');
  });
});

describe('Dashboard Routes', () => {
  it('should fetch user dashboard', async () => {
    Dashboard.find.mockResolvedValueOnce([{ data: 'test' }]);
    const response = await request(app)
      .get('/api/load-user-dashboard/')
      .query({ offset: 1 })
      .send({ userId: '1', role: 'user' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ data: 'test' }]);
  });

  it('should delete a record', async () => {
    Dashboard.updateOne.mockResolvedValueOnce({ nModified: 1 });
    const response = await request(app)
      .put('/api/delete-row')
      .send({ userId: '1', therapistId: '2' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should delete all records', async () => {
    Dashboard.updateMany.mockResolvedValueOnce({ nModified: 1 });
    const response = await request(app)
      .put('/api/delete-table')
      .send({ role: 'user', userId: '1' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Records updated successfully');
  });

  it('should update a record', async () => {
    Dashboard.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });
    const response = await request(app)
      .put('/api/add-field')
      .send({ userId: '1', therapistId: '2', rowData: { data: 'test' } });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Row deleted successfully');
  });

  it('should insert to dashboard', async () => {
    User.findById.mockResolvedValueOnce({
      _id: '1',
      username: 'test',
      email: 'test@test.com',
    });
    Dashboard.insertMany.mockResolvedValueOnce([{ data: 'test' }]);
    const response = await request(app)
      .put('/api/add-dashboard-item')
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
    Application.find.mockResolvedValueOnce([{ name: 'Test' }]);
    const response = await request(app).get('/api/view-all-applicants');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Test' }]);
  });

  it('should approve an application', async () => {
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    Therapist.prototype.save.mockResolvedValueOnce({});
    const response = await request(app)
      .post('/api/approve-therapist')
      .send({ applicationInformation: { _id: '1', name: 'Test' } });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should reject an application', async () => {
    Application.findByIdAndDelete.mockResolvedValueOnce({});
    const response = await request(app)
      .delete('/api/reject-therapist/1')
      .send({ applicantId: '1' });
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
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', 'Bearer token');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Logout successfultoken');
  });

  it('should delete a user', async () => {
    User.findOne.mockResolvedValueOnce({
      username: 'test',
      password: 'password',
      deleteOne: jest.fn().mockResolvedValueOnce({}),
    });
    const response = await request(app)
      .delete('/api/delete-user-account')
      .send({ username: 'test', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Successfully removed account');
  });
});
