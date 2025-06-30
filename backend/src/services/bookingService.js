const Booking = require('../models/Booking');

const isRoomAvailable = async (roomId, startTime, endTime) => {
    const conflict = await Booking.findOne({
        room: roomId,
        $or: [
            { startTime: { $lt: endTime, $gte: startTime } },
            { endTime: { $gt: startTime, $lte: endTime } },
            { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
        ]
    });

    return !conflict;
};

module.exports = { isRoomAvailable };
