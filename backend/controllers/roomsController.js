const Room = require('../models/Rooms');

// Controller function to get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a room by ID
exports.getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Find room by ID in the database
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Respond with the room data
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new room
exports.createRoom = async (req, res) => {
  try {
    const { name, availability } = req.body;

    // Create new room
    const newRoom = new Room({ name, availability });

    // Save room to database
    await newRoom.save();

    // Respond with success message
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { name, availability } = req.body;

    // Find room by ID in the database
    let room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update room properties
    if (name) room.name = name;
    if (availability !== undefined) room.availability = availability;

    // Save updated room to the database
    room = await room.save();

    // Respond with updated room data
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a room by ID
exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Find room by ID and delete from the database
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
