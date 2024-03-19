// Import required modules
const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

// Define routes
router.get('/', roomsController.getAllRooms);
router.get('/:id', roomsController.getRoomById);
router.post('/', roomsController.createRoom);
router.put('/:id', roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

// Export the router
module.exports = router;
