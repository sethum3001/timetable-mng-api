const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGODB_URL;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "University Timetable API",
      version: "1.0.0",
      description: "API for managing university timetables",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", require("./routes/auth.routes.js"));
app.use(
  "/enrollments",
  require("./routes/enrollments.js")
);
app.use(
  "/courses",
  require("./routes/courses.js")
);
app.use(
  "/resources",
  require("./routes/resources.js")
);
app.use(
  "/rooms",
  require("./routes/rooms.js")
);
app.use(
  "/timetables",
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
 const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = {app, server};
