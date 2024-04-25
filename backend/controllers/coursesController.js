const Course = require('../models/Courses');

// Controller function to get all courses
exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find course by ID in the database
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Respond with the course data
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, code, description, credits } = req.body;

    // Create new course
    const newCourse = new Course({ name, code, description, credits });

    // Save course to database
    await newCourse.save();

    // Respond with success message
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update an existing course
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, code, description, credits } = req.body;

    // Find course by ID in the database
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update course properties
    if (name) course.name = name;
    if (code) course.code = code;
    if (description) course.description = description;
    if (credits) course.credits = credits;

    // Save updated course to the database
    course = await course.save();

    // Respond with updated course data
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find course by ID and delete from the database
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
