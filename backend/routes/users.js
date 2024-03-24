const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { verifyAccessToken } = require("../middleware/jwt_authentications");
const { allowRoles } = require("../middleware/authorization"); 

// login
router.get("/login", UserController.loginUser);

// user registration
router.post("/register", UserController.registerUser);

// Apply token verification middleware to all other user routes
router.use(verifyAccessToken);

// GET all users
router.get("/",verifyAccessToken, allowRoles(['admin']), UserController.getAllUsers);

// GET a specific user by ID
router.get("/:id",verifyAccessToken, allowRoles(['admin', 'faculty','student']), UserController.getUserById);

// PUT update a user by ID
router.put("/:id",verifyAccessToken, allowRoles(['admin']), UserController.updateUser);

// DELETE a user by ID
router.delete("/:id",verifyAccessToken, allowRoles(['admin']), UserController.deleteUser);

module.exports = router;
