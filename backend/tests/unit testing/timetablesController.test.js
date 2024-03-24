const request = require("supertest");
const express = require("express");
const Timetable = require("../../models/Timetables");
const { connect, closeDatabase, clearDatabase } = require("../test-setup.js");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const app = express();
app.use(express.json());
app.use("/timetables", require("../../routes/timetables.js"));

describe("GET /timetables", () => {
  it("should get all timetables", async () => {
    await Timetable.create([
      {
        courseId: "65fad519a7b0094941422347",
        dayOfWeek: "Monday",
        time: "10:00",
        facultyId: "65fad519a7b0094941422347",
        location: "Room 101",
      },
      {
        courseId: "65fad519a7b0094941422347",
        dayOfWeek: "Tuesday",
        time: "11:00",
        facultyId: "65fad519a7b0094941422347",
        location: "Room 102",
      },
    ]);

    const response = await request(app).get("/timetables");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("GET /timetables/:id", () => {
  it("should get a timetable by ID", async () => {
    const timetable = await Timetable.create({
      courseId: "65fad519a7b0094941422347",
      dayOfWeek: "Monday",
      time: "10:00",
      facultyId: "65fad519a7b0094941422347",
      location: "Room 101",
    });

    const response = await request(app).get(`/timetables/${timetable._id}`);

    expect(response.status).toBe(200);
    expect(response.body.courseId).toBe("65fad519a7b0094941422347");
  });

  it("should return 500 if timetable not found", async () => {
    const response = await request(app).get("/timetables/123");

    expect(response.status).toBe(500);
  });
});

describe("POST /timetables", () => {
  it("should create a new timetable", async () => {
    const newTimetable = {
      courseId: "65fad519a7b0094941422347",
      dayOfWeek: "Wednesday",
      time: "12:00",
      facultyId: "65fad519a7b0094941422347",
      location: "Room 103",
    };

    const response = await request(app).post("/timetables").send(newTimetable);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Timetable created successfully");
    expect(response.body.timetable.courseId).toBe("65fad519a7b0094941422347");
  });
});

describe("PUT /timetables/:id", () => {
  it("should update an existing timetable", async () => {
    const timetable = await Timetable.create({
      courseId: "65fad5f78ba54de9537cfa58",
      dayOfWeek: "Monday",
      time: "10:00",
      facultyId: "65fad5f78ba54de9537cfa58",
      location: "Room 101",
    });
    const updatedTimetable = {
      courseId: "65fb2e02ddc42f2b8344cff1",
      dayOfWeek: "Thursday",
      time: "13:00",
      facultyId: "65fb2e02ddc42f2b8344cff1",
      location: "Room 104",
    };

    const response = await request(app)
      .put(`/timetables/${timetable._id}`)
      .send(updatedTimetable);

    expect(response.status).toBe(200);
    expect(response.body.courseId).toBe("65fb2e02ddc42f2b8344cff1");
  });

  it("should return 500 if timetable not found", async () => {
    const response = await request(app)
      .put("/timetables/123")
      .send({ courseId: "C005" });

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

    const response = await request(app).delete(`/timetables/${timetable._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Timetable deleted successfully");
  });

  it("should return 500 if timetable not found", async () => {
    const response = await request(app).delete("/timetables/123");

    expect(response.status).toBe(500);
  });
});
