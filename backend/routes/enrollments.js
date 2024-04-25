const express = require("express");
const router = express.Router();
const enrollmentsController = require("../controllers/enrollmentsController");

// GET all enrollments
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Enrollments
 *     summary: Retrieve all enrollments
 *     description: Retrieves a list of all enrollments
 *     operationId: getAllEnrollments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of enrollments
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Enrollment'
 *       500:
 *         description: Server error
 * definitions:
 *   Enrollment:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       courseId:
 *         type: string
 *       studentId:
 *         type: string
 *       enrollmentDate:
 *         type: string
 *         format: date-time
 */
router.get("/", enrollmentsController.getAllEnrollments);

// GET a specific enrollment by ID
/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Enrollments
 *     summary: Retrieve a specific enrollment
 *     description: Retrieves a specific enrollment by ID
 *     operationId: getEnrollmentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the enrollment to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single enrollment
 *         schema:
 *           $ref: '#/definitions/Enrollment'
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", enrollmentsController.getEnrollmentById);

// POST a new enrollment
/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Enrollments
 *     summary: Create a new enrollment
 *     description: Creates a new enrollment
 *     operationId: createEnrollment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Enrollment object that needs to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post("/", enrollmentsController.createEnrollment);

// PUT (update) an existing enrollment
/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Enrollments
 *     summary: Update an existing enrollment
 *     description: Updates an existing enrollment with the provided information
 *     operationId: updateEnrollment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the enrollment that needs to be updated
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Enrollment object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment updated
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.put("/:id", enrollmentsController.updateEnrollment);

// DELETE an enrollment
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Enrollments
 *     summary: Delete an enrollment
 *     description: Deletes an enrollment by ID
 *     operationId: deleteEnrollment
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the enrollment that needs to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", enrollmentsController.deleteEnrollment);

module.exports = router;
