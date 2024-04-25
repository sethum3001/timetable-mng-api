const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  dayOfWeek: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  // facultyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Faculty',
  //   required: true
  // },
  location: {
    type: String,
    required: true
  }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
