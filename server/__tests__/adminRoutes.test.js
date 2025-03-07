const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const Application = require('../models/application');
const Therapist = require('../models/therapist');
const jwt = require('jsonwebtoken');
const therapistsData = require('../__fixtures__/data.json');

describe('Admin Routes', () => {
  let token;
  beforeAll(async () => {
    await startServer();
    therapistsData.forEach(async (therapistJSON) => {
      const item = new Application(therapistJSON);
      item.save();
    });
    token = jwt.sign({ adminId: process.env.ADMIN }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await Application.deleteMany({});
    await Therapist.deleteMany({});
    setTimeout(() => {
      closeServer();
    }, 6500);
  });

  it('should handle application submission', async () => {
    const response = await request(app)
      .post('/api/apply')
      .send({
        data: {
          firstName: 'applytest',
          lastName: 'Tone',
          email: 'applytest@example.com',
          phoneNumber: '',
          password: 'password2applytest',
          age: 35,
          race: 'African American',
          background: 'Social Work',
          religion: 'Islam',
          location: 'Los Angeles, CA',
          expertise: 'Psychodynamic Therapy',
          yoe: 7,
          reviews: [],
        },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Application Submitted');
  });

  it('should fail to handle application submission with invalid data', async () => {
    const invalidApplicationInformation = {
      ...therapistsData[1],
      email: 'invalid-email',
      firstName: '',
    };
    const response = await request(app)
      .post('/api/apply')
      .send({
        data: { applicationInformation: invalidApplicationInformation },
      });

    expect(response.status).toBe(500);
  });

  it('should view all applications', async () => {
    const response = await request(app)
      .get('/api/admin/view-all-applicants')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { adminID: process.env.ADMIN } });

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('view all applications without token', async () => {
    const response = await request(app)
      .get('/api/admin/view-all-applicants')
      .send({ data: { adminID: process.env.ADMIN } });

    expect(response.status).toBe(403);
  });

  it('should approve an application', async () => {
    const response = await request(app)
      .post('/api/admin/approve-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          applicationInformation: therapistsData[1],
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should fail to approve an application with invalid data', async () => {
    const invalidApplicationInformation = {
      ...therapistsData[1],
      email: 'invalid-email',
    };
    const response = await request(app)
      .post('/api/admin/approve-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          applicationInformation: invalidApplicationInformation,
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(500);
  });

  it('should reject an application', async () => {
    const response = await request(app)
      .delete(`/api/admin/reject-applicant`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          email: therapistsData[2].email,
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Applicant deleted from system');
  });

  it('should fail to reject a non-existent application', async () => {
    const response = await request(app)
      .delete('/api/admin/reject-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          email: 'nonexistent@example.com',
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(404);
  });

  it('should fail to reject a due to no admin ID', async () => {
    const response = await request(app)
      .delete('/api/admin/reject-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          email: therapistsData[3].email,
        },
      });

    expect(response.status).toBe(403);
  });

  it('should handle application submission with invalid password', async () => {
    const response = await request(app)
      .post('/api/apply')
      .send({
        data: {
          firstName: 'applytest',
          lastName: 'Tone',
          email: 'applytest@example.com',
          phoneNumber: '',
          password: '',
          age: 35,
          race: 'African American',
          background: 'Social Work',
          religion: 'Islam',
          location: 'Los Angeles, CA',
          expertise: 'Psychodynamic Therapy',
          yoe: 7,
          reviews: [],
        },
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toContain('Incorrect format');
  });

  it('should handle invalid offset in view applications', async () => {
    const response = await request(app)
      .get('/api/admin/view-all-applicants?offset=invalid')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(200);
  });

  it('should handle server error in view applications', async () => {
    jest.spyOn(Application, 'find').mockImplementationOnce(() => {
      throw new Error('Server side error occurred');
    });

    const response = await request(app)
      .get('/api/admin/view-all-applicants')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server side error occurred');
  });

  it('should handle server error in approve application', async () => {
    jest.spyOn(Therapist.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Server side error occurred');
    });

    const response = await request(app)
      .post('/api/admin/approve-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          applicationInformation: therapistsData[1],
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server side error occurred');
  });

  it('should handle server error in reject application', async () => {
    jest.spyOn(Application, 'findOneAndDelete').mockImplementationOnce(() => {
      throw new Error('Server was unable to delete user from database');
    });

    const response = await request(app)
      .delete('/api/admin/reject-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          email: therapistsData[2].email,
          adminID: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe(
      'Server was unable to delete user from database',
    );
  });
});
