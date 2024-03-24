const request = require('supertest');
const express = require('express');
const User = require('../../models/Users.js');
const { connect, closeDatabase, clearDatabase } = require('../test-setup.js');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use('/users', require("../../routes/users.js"));

describe('POST /users/login', () => {
  it('should login a user', async () => {
    const user = await User.create({ username: 'test', password: 'test' });

    const response = await request(app)
      .post('/users/login')
      .send({ username: 'test', password: 'test' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged In!');
  });
});

describe('POST /users/register', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ username: 'test', password: 'test' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created!');
  });
});

describe('GET /users', () => {
  it('should get all users', async () => {
    await User.create({ username: 'test', password: 'test' });

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

describe('GET /users/:id', () => {
  it('should get a user by ID', async () => {
    const user = await User.create({ username: 'test', password: 'test' });

    const response = await request(app).get(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('test');
  });
});

describe('PUT /users/:id', () => {
  it('should update a user', async () => {
    const user = await User.create({ username: 'test', password: 'test' });

    const response = await request(app)
      .put(`/users/${user._id}`)
      .send({ username: 'updated' });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updated');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user', async () => {
    const user = await User.create({ username: 'test', password: 'test' });

    const response = await request(app).delete(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});