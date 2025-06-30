import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css'

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  const fetchRooms = async () => {
    const res = await api.get('/rooms');
    setRooms(res.data);
  };

  const handleAddRoom = async () => {
    await api.post('/rooms', { name, capacity: Number(capacity) });
    setName('');
    setCapacity('');
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container">
      <h2>Meeting Rooms</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={handleAddRoom}>Add Room</button>
      </div>

      <ul className="list">
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name} - Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
