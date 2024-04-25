// Import required modules
const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

// Define routes
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Retrieve all rooms
 *     description: Retrieves a list of all rooms
 *     operationId: getAllRooms
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of rooms
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Room'
 *       500:
 *         description: Server error
 * definitions:
 *   Room:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       capacity:
 *         type: integer
 *       resources:
 *         type: array
 *         items:
 *           type: string
 */
router.get('/', roomsController.getAllRooms);
/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Retrieve a specific room
 *     description: Retrieves a specific room by ID
 *     operationId: getRoomById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A room
 *         schema:
 *           $ref: '#/definitions/Room'
 *       404:
 *         description: Room not found
 */
router.get('/:id', roomsController.getRoomById);
/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Create a new room
 *     description: Creates a new room
 *     operationId: createRoom
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Room'
 *     responses:
 *       201:
 *         description: Room created
 *       400:
 *         description: Invalid input, object invalid
 * definitions:
 *   Room:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       capacity:
 *         type: integer
 *       resources:
 *         type: array
 *         items:
 *           type: string
 */
router.post('/', roomsController.createRoom);
/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Rooms
 *     summary: Update a specific room
 *     description: Updates a specific room by ID
 *     operationId: updateRoom
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room to update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Room object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Room'
 *     responses:
 *       200:
 *         description: Room updated
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Room not found
 */
router.put('/:id', roomsController.updateRoom);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Delete a specific room
 *     description: Deletes a specific room by ID
 *     operationId: deleteRoom
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Room deleted
 *       404:
 *         description: Room not found
 */
router.delete('/:id', roomsController.deleteRoom);

// Export the router
module.exports = router;
