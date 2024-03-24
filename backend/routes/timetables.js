const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetablesController');
const { verifyAccessToken } = require("../middleware/jwt_authentications.js");
const { allowRoles } = require("../middleware/authorization.js");

// GET all timetables
router.get('/',verifyAccessToken, allowRoles(['admin', 'faculty','student']), timetableController.getAllTimetables);

// GET a specific timetable by ID
router.get('/:id',verifyAccessToken, allowRoles(['admin', 'faculty', 'student']), timetableController.getTimetableById);

// POST a new timetable
router.post('/',verifyAccessToken, allowRoles(['admin', 'faculty']), timetableController.createTimetable);

// PUT update a timetable by ID
router.put('/:id', verifyAccessToken, allowRoles(['admin', 'faculty']), timetableController.updateTimetable);

// DELETE a timetable by ID
router.delete('/:id',verifyAccessToken, allowRoles(['admin', 'faculty']), timetableController.deleteTimetable);

module.exports = router;
