const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationController');

// GET all notifications
router.get('/', notificationsController.getAllNotifications);

// GET a specific notification by ID
router.get('/:id', notificationsController.getNotificationById);

// POST a new notification
router.post('/', notificationsController.createNotification);

// PUT/update a notification by ID
router.put('/:id', notificationsController.updateNotificationById);

// DELETE a notification by ID
router.delete('/:id', notificationsController.deleteNotificationById);

module.exports = router;
