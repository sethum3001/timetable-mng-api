const request = require('supertest');
const express = require('express');
const Courses = require('../../models/Courses.js');
const { connect, closeDatabase, clearDatabase } = require('../test-setup.js');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use(
    "/courses",
    require("../../routes/courses.js")
  );

describe('GET /courses', () => {
  it('should get all courses', async () => {
    await Courses.create([
      { name: 'Course 1', code: 'C001', description: 'Description 1', credits: 3 },
      { name: 'Course 2', code: 'C002', description: 'Description 2', credits: 4 },
    ]);

    const response = await request(app).get('/courses');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe('GET /courses/:id', () => {
  it('should get a course by ID', async () => {
    const course = await Courses.create({ name: 'Course 1', code: 'C001', description: 'Description 1', credits: 3 });

    const response = await request(app).get(`/courses/${course._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Course 1');
  });

  it('should return 500 if course not found', async () => {
    const response = await request(app).get('/courses/123');

    expect(response.status).toBe(500);
  });
});

describe('POST /courses', () => {
  it('should create a new course', async () => {
    const newCourse = { name: 'New Course', code: 'NC001', description: 'New Description', credits: 4 };

    const response = await request(app).post('/courses').send(newCourse);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Course created successfully');
    expect(response.body.course.name).toBe('New Course');
  });
});

describe('PUT /courses/:id', () => {
  it('should update an existing course', async () => {
    const course = await Courses.create({ name: 'Course 1', code: 'C001', description: 'Description 1', credits: 3 });
    const updatedCourse = { name: 'Updated Course', code: 'UC001', description: 'Updated Description', credits: 5 };

    const response = await request(app).put(`/courses/${course._id}`).send(updatedCourse);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Course');
  });

  it('should return 500 if course not found', async () => {
    const response = await request(app).put('/courses/123').send({ name: 'Updated Course' });

    expect(response.status).toBe(500);
  });
});

describe('DELETE /courses/:id', () => {
  it('should delete an existing course', async () => {
    const course = await Courses.create({ name: 'Course 1', code: 'C001', description: 'Description 1', credits: 3 });

    const response = await request(app).delete(`/courses/${course._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Course deleted successfully');
  });

  it('should return 500 if course not found', async () => {
    const response = await request(app).delete('/courses/123');

    expect(response.status).toBe(500);
  });
});
