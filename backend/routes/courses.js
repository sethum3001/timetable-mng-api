// Import required modules
const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

// Define routes

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     description: Fetches all the courses from the database
 *     operationId: getAllCourses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Course'
 * definitions:
 *   Course:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       code:
 *         type: string
 *       description:
 *         type: string
 *       credits:
 *         type: integer
 */
router.get("/", coursesController.getAllCourses);

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     description: Creates a new course with the provided information
 *     operationId: createCourse
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Course object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Course'
 *     responses:
 *       201:
 *         description: Course created
 *       400:
 *         description: Invalid input, object invalid
 * definitions:
 *   Course:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       code:
 *         type: string
 *       description:
 *         type: string
 *       credits:
 *         type: integer
 */
router.get("/:id", coursesController.getCourseById);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updateCourse);
router.delete("/:id", coursesController.deleteCourse);

// Export the router
module.exports = router;
