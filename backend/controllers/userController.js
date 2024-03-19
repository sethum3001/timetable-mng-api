const User = require('../models/Users');

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ role, username, password });

    // Save user to database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, username, password } = req.body;

    // Find user by ID in the database
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties
    if (username) user.username = username;
    if (password) user.password = password;
    if (role) user.role = role;

    // Save updated user to the database
    user = await user.save();

    // Respond with updated user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and delete from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
