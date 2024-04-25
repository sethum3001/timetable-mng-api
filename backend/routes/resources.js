const express = require("express");
const router = express.Router();
const resourcesController = require("../controllers/resourcesController");

// GET all resources
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Retrieve all resources
 *     description: Retrieves a list of all resources
 *     operationId: getAllResources
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of resources
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Resource'
 *       500:
 *         description: Server error
 * definitions:
 *   Resource:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       type:
 *         type: string
 *       url:
 *         type: string
 */
router.get("/", resourcesController.getAllResources);

// GET a specific resource by ID
/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Retrieve a specific resource
 *     description: Retrieves a specific resource by ID
 *     operationId: getResourceById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the resource to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A resource object
 *         schema:
 *           $ref: '#/definitions/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.get("/:id", resourcesController.getResourceById);

// POST a new resource
/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Resources
 *     summary: Create a new resource
 *     description: Creates a new resource
 *     operationId: createResource
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Resource object that needs to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Resource'
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post("/", resourcesController.createResource);

// PUT/update a resource by ID
/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Resources
 *     summary: Update an existing resource
 *     description: Updates an existing resource with the provided information
 *     operationId: updateResource
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the resource that needs to be updated
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Resource object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Resource'
 *     responses:
 *       200:
 *         description: Resource updated
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Resource not found
 */
router.put("/:id", resourcesController.updateResourceById);

// DELETE a resource by ID
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Resources
 *     summary: Delete a resource
 *     description: Deletes a resource by ID
 *     operationId: deleteResourceById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the resource to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", resourcesController.deleteResourceById);

module.exports = router;
