const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetablesController");
const { verifyAccessToken } = require("../middleware/jwt_authentications.js");
const { allowRoles } = require("../middleware/authorization.js");

// GET all timetables
/**
 * @swagger
 * /:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Timetables
 *     summary: Retrieve all timetables
 *     description: Retrieves a list of all timetables. Requires a valid access token and user role must be 'admin', 'faculty', or 'student'.
 *     operationId: getAllTimetables
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of timetables
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Timetable'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 * definitions:
 *   Timetable:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       courses:
 *         type: array
 *         items:
 *           type: string
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
router.get(
  "/",
  verifyAccessToken,
  allowRoles(["admin", "faculty", "student"]),
  timetableController.getAllTimetables
);

// GET a specific timetable by ID
/**
 * @swagger
 * /{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Timetables
 *     summary: Retrieve a specific timetable
 *     description: Retrieves a specific timetable by ID. Requires a valid access token and user role must be 'admin', 'faculty', or 'student'.
 *     operationId: getTimetableById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the timetable to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Timetable'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Timetable not found
 *       500:
 *         description: Server error
 */
router.get(
  "/specific",
  verifyAccessToken,
  allowRoles(["admin", "faculty", "student"]),
  timetableController.retrieveTimetable
);

// POST a new timetable
/**
 * @swagger
 * /:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Timetables
 *     summary: Create a new timetable
 *     description: Creates a new timetable with the provided information. Requires a valid access token and user role must be 'admin' or 'faculty'.
 *     operationId: createTimetable
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Timetable object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Timetable'
 *     responses:
 *       201:
 *         description: Timetable created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  verifyAccessToken,
  allowRoles(["admin", "faculty"]),
  timetableController.createTimetable
);

// PUT update a timetable by ID
/**
 * @swagger
 * /{id}:
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Timetables
 *     summary: Update an existing timetable
 *     description: Updates an existing timetable with the provided information. Requires a valid access token and user role must be 'admin' or 'faculty'.
 *     operationId: updateTimetable
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the timetable to update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Timetable object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Timetable'
 *     responses:
 *       200:
 *         description: Timetable updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  verifyAccessToken,
  allowRoles(["admin", "faculty"]),
  timetableController.updateTimetable
);

// DELETE a timetable by ID
/**
 * @swagger
 * /{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Timetables
 *     summary: Delete a specific timetable
 *     description: Deletes a specific timetable by ID. Requires a valid access token and user role must be 'admin' or 'faculty'.
 *     operationId: deleteTimetable
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the timetable to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Timetable deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Timetable not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  verifyAccessToken,
  allowRoles(["admin", "faculty"]),
  timetableController.deleteTimetable
);


module.exports = router;
