import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css'

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchData = async () => {
    const [roomsRes, bookingsRes] = await Promise.all([
      api.get('/rooms'),
      api.get('/bookings')
    ]);
    setRooms(roomsRes.data);
    setBookings(bookingsRes.data);
  };

  const handleCreateBooking = async () => {
    await api.post('/bookings', { user, roomId, startTime, endTime });
    setUser('');
    setRoomId('');
    setStartTime('');
    setEndTime('');
    fetchData();
  };

  const handleDeleteBooking = async (id) => {
    await api.delete(`/bookings/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Bookings</h2>
      <div className="form">
        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button onClick={handleCreateBooking}>Book</button>
      </div>

      <ul className="list">
        {bookings.map((b) => (
          <li key={b._id}>
            {b.user} booked {b.room.name} from {new Date(b.startTime).toLocaleString()} to {new Date(b.endTime).toLocaleString()}
            <button onClick={() => handleDeleteBooking(b._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
