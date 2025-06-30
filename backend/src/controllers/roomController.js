const Room = require('../models/Room');

const getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
};

const createRoom = async (req, res) => {
    const { name, capacity } = req.body;
    const room = new Room({ name, capacity });
    await room.save();
    res.status(201).json(room);
};

module.exports = { getRooms, createRoom };
