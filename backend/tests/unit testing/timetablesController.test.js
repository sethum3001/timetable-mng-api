const request = require("supertest");
const express = require("express");
const Timetable = require("../../models/Timetables");
const { connect, closeDatabase, clearDatabase } = require("../test-setup.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use("/timetables", require("../../routes/timetables.js"));

describe("GET /timetables", () => {
  it("should get all timetables", async () => {
    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Create timetables
    await Timetable.create([
      {
        courseId: "65fad519a7b0094941422347",
        dayOfWeek: "Monday",
        time: "10:00",
        location: "Room 101",
      },
      {
        courseId: "65fad519a7b0094941422347",
        dayOfWeek: "Tuesday",
        time: "11:00",
        location: "Room 102",
      },
    ]);

    // Send request with valid access token in the header
    const response = await request(app)
      .get("/timetables")
      .set('Authorization', `Bearer ${token}`); // Include the access token in the header

    // Assert response status and body
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

// describe("GET /timetables/specific", () => {
//   it("should get a timetable by ID", async () => {
//     const timetable = await Timetable.create({
//       courseId: "65fad519a7b0094941422347",
//       dayOfWeek: "Monday",
//       time: "10:00",
//       location: "Room 101",
//     });

//     // Create a valid access token with appropriate roles (Admin or Faculty)
//     const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

//     // Send request with valid access token in the header
//     const response = await request(app)
//       .get(`/timetables/specific?courseId=65fad519a7b0094941422347`)
//       .set('Authorization', `Bearer ${token}`); // Include the access token in the header

//     // Assert response status and body
//     expect(response.status).toBe(200);
//     expect(response.body.courseId).toBe("65fad519a7b0094941422347");
//   });

//   it("should return 500 if timetable not found", async () => {
//     // Create a valid access token with appropriate roles (Admin or Faculty)
//     const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

//     // Send request with valid access token in the header
//     const response = await request(app)
//       .get("/timetables/123")
//       .set('Authorization', `Bearer ${token}`); // Include the access token in the header

//     // Assert response status
//     expect(response.status).toBe(500);
//   });
// });

describe("POST /timetables", () => {
  it("should create a new timetable", async () => {
    const newTimetable = {
      courseId: "65fad519a7b0094941422347",
      dayOfWeek: "Wednesday",
      time: "12:00",
      facultyId: "65fad519a7b0094941422347",
      location: "Room 103",
    };

    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Send request with valid access token in the header
    const response = await request(app)
      .post("/timetables")
      .set('Authorization', `Bearer ${token}`) // Include the access token in the header
      .send(newTimetable);

    // Assert response status and body
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Timetable created successfully");
    expect(response.body.timetable.courseId).toBe("65fad519a7b0094941422347");
  });
});

describe("PUT /timetables/:id", () => {
  it("should update an existing timetable", async () => {
    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Create a timetable
    const timetable = await Timetable.create({
      courseId: "65fad5f78ba54de9537cfa58",
      dayOfWeek: "Monday",
      time: "10:00",
      facultyId: "65fad5f78ba54de9537cfa58",
      location: "Room 101",
    });

    // Updated timetable data
    const updatedTimetable = {
      courseId: "65fb2e02ddc42f2b8344cff1",
      dayOfWeek: "Thursday",
      time: "13:00",
      facultyId: "65fb2e02ddc42f2b8344cff1",
      location: "Room 104",
    };

    // Send request with valid access token in the header
    const response = await request(app)
      .put(`/timetables/${timetable._id}`)
      .set('Authorization', `Bearer ${token}`) // Include the access token in the header
      .send(updatedTimetable);

    // Assert response status and body
    expect(response.status).toBe(200);
    expect(response.body.courseId).toBe("65fb2e02ddc42f2b8344cff1");
  });

  it("should return 500 if timetable not found", async () => {
    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Send request with valid access token in the header
    const response = await request(app)
      .put("/timetables/123")
      .set('Authorization', `Bearer ${token}`) // Include the access token in the header
      .send({ courseId: "C005" });

    // Assert response status
    expect(response.status).toBe(500);
  });
});

describe("DELETE /timetables/:id", () => {
  it("should delete an existing timetable", async () => {
    const timetable = await Timetable.create({
      courseId: "65fb2e02ddc42f2b8344cff1",
      dayOfWeek: "Monday",
      time: "10:00",
      facultyId: "65fb2e02ddc42f2b8344cff1",
      location: "Room 101",
    });

    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Send request with valid access token in the header
    const response = await request(app)
      .delete(`/timetables/${timetable._id}`)
      .set('Authorization', `Bearer ${token}`); // Include the access token in the header

    // Assert response status and body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Timetable deleted successfully");
  });

  it("should return 500 if timetable not found", async () => {
    // Create a valid access token with appropriate roles (Admin or Faculty)
    const token = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);

    // Send request with valid access token in the header
    const response = await request(app)
      .delete("/timetables/123")
      .set('Authorization', `Bearer ${token}`); // Include the access token in the header

    // Assert response status
    expect(response.status).toBe(500);
  });
});
