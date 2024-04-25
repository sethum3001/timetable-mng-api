const Resource = require('../models/Resources');

// Controller function to get all resources
exports.getAllResources = async (req, res) => {
  try {
    // Fetch all resources from the database
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resourceId = req.params.id;

    // Find resource by ID in the database
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Respond with the resource data
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new resource
exports.createResource = async (req, res) => {
  try {
    const { name, availability } = req.body;

    // Create new resource
    const newResource = new Resource({ name, availability });

    // Save resource to database
    await newResource.save();

    // Respond with success message
    res.status(201).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a resource by ID
exports.updateResourceById = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const { name, availability } = req.body;

    // Find resource by ID in the database
    let resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Update resource properties
    if (name) resource.name = name;
    if (availability !== undefined) resource.availability = availability;

    // Save updated resource to the database
    resource = await resource.save();

    // Respond with updated resource data
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a resource by ID
exports.deleteResourceById = async (req, res) => {
  try {
    const resourceId = req.params.id;

    // Find resource by ID and delete from the database
    const deletedResource = await Resource.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
