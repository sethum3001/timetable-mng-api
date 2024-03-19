// Import required modules
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

// Define routes
router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

// Export the router
module.exports = router;
