const request = require("supertest");
const express = require("express");
const Enrollment = require("../../models/Enrollments.js");
const { connect, closeDatabase, clearDatabase } = require("../test-setup.js");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use("/enrollments", require("../../routes/enrollments.js"));

describe("GET /enrollments", () => {
  it("should get all enrollments", async () => {
    await Enrollment.create([
      {
        studentId: "65faaf10f8c28c5a6eea5cf5",
        courseId: "65faaf10f8c28c5a6eea5cf5",
      },
      {
        studentId: "65fab53118db5dca67591dfc",
        courseId: "65fab53118db5dca67591dfc",
      },
    ]);

    const response = await request(app).get("/enrollments");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("GET /enrollments/:id", () => {
  it("should get an enrollment by ID", async () => {
    const enrollment = await Enrollment.create({
      studentId: "65fab53118db5dca67591dfc",
      courseId: "65fab53118db5dca67591dfc",
    });

    const response = await request(app).get(`/enrollments/${enrollment._id}`);

    expect(response.status).toBe(200);
    expect(response.body.studentId).toBe("65fab53118db5dca67591dfc");
  });

  it("should return 500 if enrollment not found", async () => {
    const response = await request(app).get("/enrollments/123");

    expect(response.status).toBe(500);
  });
});

describe("POST /enrollments", () => {
  it("should create a new enrollment", async () => {
    const newEnrollment = {
      studentId: "65fab53118db5dca67591dfc",
      courseId: "65fab53118db5dca67591dfc",
    };

    const response = await request(app)
      .post("/enrollments")
      .send(newEnrollment);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Enrollment created successfully");
    expect(response.body.enrollment.studentId).toBe("65fab53118db5dca67591dfc");
  });
});

describe("PUT /enrollments/:id", () => {
  it("should update an existing enrollment", async () => {
    const enrollment = await Enrollment.create({
      studentId: "65fab53118db5dca67591dfc",
      courseId: "65fab53118db5dca67591dfc",
    });
    const updatedEnrollment = {
      studentId: "65fad377bbce29065c826515",
      courseId: "65fad377bbce29065c826515",
    };

    const response = await request(app)
      .put(`/enrollments/${enrollment._id}`)
      .send(updatedEnrollment);

    expect(response.status).toBe(200);
    expect(response.body.courseId).toBe("65fad377bbce29065c826515");
  });

  it("should return 500 if enrollment not found", async () => {
    const response = await request(app)
      .put("/enrollments/123")
      .send({
        studentId: "65fad377bbce29065c826515",
        courseId: "65fad377bbce29065c826515",
      });

    expect(response.status).toBe(500);
  });
});

describe("DELETE /enrollments/:id", () => {
  it("should delete an existing enrollment", async () => {
    const enrollment = await Enrollment.create({
      studentId: "65fad377bbce29065c826515",
      courseId: "65fad377bbce29065c826515",
    });

    const response = await request(app).delete(
      `/enrollments/${enrollment._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Enrollment deleted successfully");
  });

  it("should return 500 if enrollment not found", async () => {
    const response = await request(app).delete("/enrollments/123");

    expect(response.status).toBe(500);
  });
});
