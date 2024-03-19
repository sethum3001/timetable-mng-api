const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');

// GET all resources
router.get('/', resourcesController.getAllResources);

// GET a specific resource by ID
router.get('/:id', resourcesController.getResourceById);

// POST a new resource
router.post('/', resourcesController.createResource);

// PUT/update a resource by ID
router.put('/:id', resourcesController.updateResourceById);

// DELETE a resource by ID
router.delete('/:id', resourcesController.deleteResourceById);

module.exports = router;
