const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const { verifyAccessToken } = require("./middleware/jwt_authentications.js");
const {
  authorizeAdmin,
  authorizeFaculty,
  authorizeStudent,
  allowRoles,
} = require("./middleware/authorization.js");

const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGODB_URL;

app.use("/auth", require("./routes/auth.routes.js"));
app.use(
  "/enrollments",
  verifyAccessToken,
  authorizeStudent,
  require("./routes/enrollments.js")
);
app.use(
  "/courses",
  verifyAccessToken,
  authorizeAdmin,
  require("./routes/courses.js")
);
app.use(
  "/notifications",
  verifyAccessToken,
  authorizeAdmin,
  require("./routes/notification.js")
);
app.use(
  "/resources",
  verifyAccessToken,
  authorizeAdmin,
  require("./routes/resources.js")
);
app.use(
  "/rooms",
  verifyAccessToken,
  authorizeAdmin,
  require("./routes/rooms.js")
);
app.use(
  "/timetables",
  verifyAccessToken,
  allowRoles(["admin", "faculty"]),
  require("./routes/timetables.js")
);
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

module.exports = app;
