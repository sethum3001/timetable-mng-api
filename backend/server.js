const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGODB_URL;

app.use("/enrollments", require("./routes/enrollments.js"));
app.use("/courses", require("./routes/courses.js"));
app.use("/notifications", require("./routes/notification.js"));
app.use("/resources", require("./routes/resources.js"));
app.use("/rooms", require("./routes/rooms.js"));
app.use("/timetables", require("./routes/timetables.js"));
app.use("/users", require("./routes/users.js"));

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database not connected", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
