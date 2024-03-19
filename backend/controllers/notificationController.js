const Notification = require('../models/Notifications');

// Controller function to get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    // Fetch all notifications from the database
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Find notification by ID in the database
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Respond with the notification data
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { message, type, userId } = req.body;

    // Create new notification
    const newNotification = new Notification({ message, type, userId });

    // Save notification to database
    await newNotification.save();

    // Respond with success message
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a notification by ID
exports.updateNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { message, type, userId } = req.body;

    // Find notification by ID in the database
    let notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update notification properties
    if (message) notification.message = message;
    if (type) notification.type = type;
    if (userId) notification.userId = userId;

    // Save updated notification to the database
    notification = await notification.save();

    // Respond with updated notification data
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a notification by ID
exports.deleteNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Find notification by ID and delete from the database
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
