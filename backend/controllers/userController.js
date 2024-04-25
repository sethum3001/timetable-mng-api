const User = require("../models/Users");
const { registerSchema } = require("../middleware/joi_auth");
const {
  signAccessToken,
  signRefreshToken,
} = require("../middleware/jwt_authentications");
const bcrypt = require("bcrypt");
const logger = require("../service/logger");

// Controller function for user login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create access token and send it to client
    const accessToken = await signAccessToken(
      user._id,
      user.role,
      user.username
    );
    const refreshToken = await signRefreshToken(
      user._id,
      user.role,
      user.username
    );

    logger.info(`User ${user.username} logged in`);

    // Respond with success message
    res.status(200).json({ accessToken, refreshToken, message: "Logged In!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for user registration
exports.registerUser = async (req, res,next) => {
  try {
    // Validate input data
    const result = await registerSchema.validateAsync(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ username: result.username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ role: result.role, username: result.username, email:  result.email, password: result.password });

    // Save user to database
    const savedUser = await newUser.save();

    // Create access token and send it to client
    const accessToken = await signAccessToken(
      savedUser._id,
      savedUser.role,
      savedUser.username
    );
    const refreshToken = await signRefreshToken(
      savedUser._id,
      savedUser.role,
      savedUser.username
    );

    // Respond with success message
    res
      .status(201)
      .json({ accessToken, refreshToken, message: "User created!" });
  } catch (error) {
     if (error.isJoi === true){
      res.status(422).json({ message: error.message });
     }else{
      res.status(500).json({ message: "Internal server error" });
     }

  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, username, email, password } = req.body;

    // Find user by ID in the database
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user properties
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;

    // Save updated user to the database
    user = await user.save();

    // Respond with updated user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and delete from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
