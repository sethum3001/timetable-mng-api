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
router.post("/", coursesController.createCourse);
/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update an existing course
 *     description: Updates an existing course with the provided information
 *     operationId: updateCourse
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the course that needs to be updated
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Course object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Course'
 *     responses:
 *       200:
 *         description: Course updated
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Course not found
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
router.put("/:id", coursesController.updateCourse);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete an existing course
 *     description: Deletes an existing course with the provided ID
 *     operationId: deleteCourse
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the course that needs to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
router.delete("/:id", coursesController.deleteCourse);

// Export the router
module.exports = router;
