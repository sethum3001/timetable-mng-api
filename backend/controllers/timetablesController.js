const Timetable = require('../models/Timetables');
const {sendEmails} = require('./notificationController');

// Controller function to get all timetables
exports.getAllTimetables = async (req, res) => {
  try {
    // Fetch all timetables from the database
    const timetables = await Timetable.find();
    res.status(200).json(timetables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a timetable by ID
exports.getTimetableById = async (req, res) => {
  try {
    const timetableId = req.params.id;

    // Find timetable by ID in the database
    const timetable = await Timetable.findById(timetableId);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Respond with the timetable data
    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new timetable
exports.createTimetable = async (req, res) => {
  try {
    const { courseId, dayOfWeek, time, location } = req.body;

    // Create new timetable
    const newTimetable = new Timetable({ courseId, dayOfWeek, time, location });

    // Save timetable to database
    await newTimetable.save();

    // Respond with success message
    res.status(201).json({ message: 'Timetable created successfully', timetable: newTimetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a timetable by ID
exports.updateTimetable = async (req, res) => {
  try {
    const timetableId = req.params.id;
    const { courseId, dayOfWeek, time, location } = req.body;

    // Find timetable by ID in the database
    let timetable = await Timetable.findById(timetableId);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Update timetable properties
    if (courseId) timetable.courseId = courseId;
    if (dayOfWeek) timetable.dayOfWeek = dayOfWeek;
    if (time) timetable.time = time;
    // if (facultyId) timetable.facultyId = facultyId;
    if (location) timetable.location = location;

    // Save updated timetable to the database
    timetable = await timetable.save();

   // Prepare timetable change details
   const timetableChanges = {
    date: timetable.dayOfWeek, // Replace with actual date property
    time: timetable.time,
    course: timetable.courseId, // Replace with actual course name property
    location: timetable.location
  };  

  // Send email notifications to students
  sendEmails(timetableChanges);

  // Respond with updated timetable data
  res.status(200).json(timetable);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
};

// Controller function to delete a timetable by ID
exports.deleteTimetable = async (req, res) => {
  try {
    const timetableId = req.params.id;

    // Find timetable by ID and delete from the database
    const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);
    if (!deletedTimetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.retrieveTimetable = async (req, res) => {
  try {
    const { facultyId, courseId } = req.query; // Assuming you pass facultyId and courseId from the frontend

    // Construct the query object based on the passed values
    const query = {};
    // if (facultyId) query.facultyId = facultyId;
    if (courseId) query.courseId = courseId;

    // Find timetable documents that match the query criteria
    const timetables = await Timetable.find(query);

    // Respond with the found timetables
    res.status(200).json(timetables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};