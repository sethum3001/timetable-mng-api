const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const {verifyAccessToken} = require('./authentication/jwt');

const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGODB_URL;

app.use("/enrollments",verifyAccessToken, require("./routes/enrollments.js"));
app.use("/courses",verifyAccessToken, require("./routes/courses.js"));
app.use("/notifications",verifyAccessToken, require("./routes/notification.js"));
app.use("/resources",verifyAccessToken, require("./routes/resources.js"));
app.use("/rooms",verifyAccessToken, require("./routes/rooms.js"));
app.use("/timetables",verifyAccessToken, require("./routes/timetables.js"));
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
