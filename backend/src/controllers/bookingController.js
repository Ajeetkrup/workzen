const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { isRoomAvailable } = require('../services/bookingService');

const getBookings = async (req, res) => {
    const bookings = await Booking.find().populate('room');
    res.json(bookings);
};

const createBooking = async (req, res) => {
    const { roomId, user, startTime, endTime } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const available = await isRoomAvailable(roomId, new Date(startTime), new Date(endTime));

    if (!available) return res.status(409).json({ error: 'Room is not available in the given time slot' });

    const booking = new Booking({ room: roomId, user, startTime, endTime });
    await booking.save();

    res.status(201).json(booking);
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const result = await Booking.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking cancelled' });
};

module.exports = { getBookings, createBooking, deleteBooking };
