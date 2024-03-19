const Enrollment = require('../models/Enrollments');

// Controller function to get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    // Fetch all enrollments from the database
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get an enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;

    // Find enrollment by ID in the database
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Respond with the enrollment data
    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Create new enrollment
    const newEnrollment = new Enrollment({ studentId, courseId });

    // Save enrollment to database
    await newEnrollment.save();

    // Respond with success message
    res.status(201).json({ message: 'Enrollment created successfully', enrollment: newEnrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update an existing enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const { studentId, courseId } = req.body;

    // Find enrollment by ID in the database
    let enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Update enrollment properties
    if (studentId) enrollment.studentId = studentId;
    if (courseId) enrollment.courseId = courseId;

    // Save updated enrollment to the database
    enrollment = await enrollment.save();

    // Respond with updated enrollment data
    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;

    // Find enrollment by ID and delete from the database
    const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
