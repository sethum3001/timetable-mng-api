const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { verifyAccessToken } = require("../middleware/jwt_authentications");
const { allowRoles } = require("../middleware/authorization"); 

// login
/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: Logs in a user and returns a token
 *     operationId: loginUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: username
 *         description: The user's username
 *         required: true
 *         type: string
 *       - in: query
 *         name: password
 *         description: The user's password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.get("/login", UserController.loginUser);

// user registration
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registers a new user
 *     operationId: registerUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User created
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             username:
 *               type: string
 *             role:
 *               type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */
router.post("/register", UserController.registerUser);

// Apply token verification middleware to all other user routes

router.use(verifyAccessToken);

// GET all users
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Returns all users
 *     operationId: getAllUsers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       500:
 *         description: Server error
 */
router.get("/",verifyAccessToken, allowRoles(['admin']), UserController.getAllUsers);

// GET a specific user by ID
/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     description: Returns a user by ID
 *     operationId: getUserById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A user
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id",verifyAccessToken, allowRoles(['admin', 'faculty','student']), UserController.getUserById);

// PUT update a user by ID
/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Updates a user by ID
 *     operationId: updateUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's ID
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: The user to update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User updated
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id",verifyAccessToken, allowRoles(['admin']), UserController.updateUser);

// DELETE a user by ID
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Deletes a user by ID
 *     operationId: deleteUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",verifyAccessToken, allowRoles(['admin']), UserController.deleteUser);

module.exports = router;
