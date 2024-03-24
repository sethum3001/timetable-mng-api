const request = require('supertest');
const express = require('express');
const User = require('../../models/Users');
const { connect, closeDatabase, clearDatabase } = require('../test-setup.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use("/users", require("../../routes/users.js"));

describe("GET /users", () => {
  it("should get all users", async () => {
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    await User.create([
      { username: 'user1', email: 'user1@example.com', password: 'password1', role: 'user' },
      { username: 'user2', email: 'user2@example.com', password: 'password2', role: 'admin' },
    ]);

    const response = await request(app)
      .get("/users")
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("GET /users/:id", () => {
  it("should get a user by ID", async () => {
    const user = await User.create({ username: 'user1', email: 'user1@example.com', password: 'password1', role: 'admin' });
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('user1');
  });

  it("should return 404 if user not found", async () => {
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .get("/users/123")
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
});

describe("PUT /users/:id", () => {
  it("should update an existing user", async () => {
    const user = await User.create({ username: 'user1', email: 'user1@example.com', password: 'password1', role: 'admin' });
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updatedUser', email: 'updated@example.com', password: 'updatedPassword', role: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updatedUser');
  });

  it("should return 404 if user not found", async () => {
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .put("/users/123")
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updatedUser', email: 'updated@example.com', password: 'updatedPassword', role: 'admin' });

    expect(response.status).toBe(500);
  });
});

describe("DELETE /users/:id", () => {
  it("should delete an existing user", async () => {
    const user = await User.create({ username: 'user1', email: 'user1@example.com', password: 'password1', role: 'admin' });
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });

  it("should return 404 if user not found", async () => {
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    const response = await request(app)
      .delete("/users/123")
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
});