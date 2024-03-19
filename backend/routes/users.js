const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// GET all users
router.get('/', UserController.getAllUsers);

// GET a specific user by ID
router.get('/:id', UserController.getUserById);

// POST a new user
router.post('/', UserController.createUser);

// PUT update a user by ID
router.put('/:id', UserController.updateUser);

// DELETE a user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
