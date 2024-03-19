const express = require("express");
const router = express.Router();
const enrollmentsController = require("../controllers/enrollmentsController");

// GET all enrollments
router.get("/", enrollmentsController.getAllEnrollments);

// GET a specific enrollment by ID
router.get("/:id", enrollmentsController.getEnrollmentById);

// POST a new enrollment
router.post("/", enrollmentsController.createEnrollment);

// PUT (update) an existing enrollment
router.put("/:id", enrollmentsController.updateEnrollment);

// DELETE an enrollment
router.delete("/:id", enrollmentsController.deleteEnrollment);

module.exports = router;
