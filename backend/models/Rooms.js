const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
