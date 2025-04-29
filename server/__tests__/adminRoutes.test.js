const request = require('supertest');
const { app, startServer, closeServer } = require('../index');
const Application = require('../models/application');
const Therapist = require('../models/therapist');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const therapistsData = require('../__fixtures__/therapists.data.json');

// jest.setTimeout(30000);

describe('Admin Routes', () => {
  let token;
  let username = 'adminUser';

  beforeAll(async () => {
    await startServer();
    therapistsData.forEach(async (therapistJSON) => {
      const item = new Application(therapistJSON);
      item.save();
    });
    const user = {
      adminId: process.env.ADMIN,
      username: 'adminUser',
      email: 'example@example.com',
      password: 'securepassword123',
      age: 25,
    };
    const admin = new User(user);
    admin.save();
    token = jwt.sign(
      { email: 'example@example.com', username },
      process.env.JWT_SECRET,
    );

    console.error(token);
  });

  afterAll(async () => {
    await Application.deleteMany({});
    await Therapist.deleteMany({});
    await User.deleteMany({});
    await closeServer();
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
      .get('/api/admin/view-all-applicants/0')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: { adminId: process.env.ADMIN, username } });

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.total).toBeGreaterThan(0);
  });

  it('view all applications without token', async () => {
    const response = await request(app)
      .get('/api/admin/view-all-applicants/0')
      .send({ data: { adminId: process.env.ADMIN, username } });

    expect(response.status).toBe(403);
  });

  it('should approve an application', async () => {
    const response = await request(app)
      .post('/api/admin/approve-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          applicationInformation: therapistsData[1],
          adminId: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe('Applicant accepted!');
  });

  it('should fail to approve an application with invalid email', async () => {
    const invalidApplicationInformation = {
      ...therapistsData[3],
      email: 'invalid-email',
    };
    const response = await request(app)
      .post('/api/admin/approve-applicant')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          applicationInformation: invalidApplicationInformation,
          adminId: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(404);
  });

  it('should reject an application', async () => {
    const response = await request(app)
      .delete(`/api/admin/reject-applicant`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          email: therapistsData[2].email,
          adminId: process.env.ADMIN,
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
          adminId: process.env.ADMIN,
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
      .set('Authorization', `Bearer ${token}`)
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
    expect(response.text).toContain('Incorrect format');
  });

  it('should fail with invalid offset in view applications', async () => {
    const response = await request(app)
      .get('/api/admin/view-all-applicants/invalid')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          adminId: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(200);
  });

  it('should handle server error in view applications', async () => {
    jest.spyOn(Application, 'find').mockImplementationOnce(() => {
      throw new Error('Server side error occurred');
    });

    const response = await request(app)
      .get('/api/admin/view-all-applicants/0')
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          adminId: process.env.ADMIN,
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
          adminId: process.env.ADMIN,
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
          adminId: process.env.ADMIN,
        },
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe(
      'Server was unable to delete user from database',
    );
  });
});
