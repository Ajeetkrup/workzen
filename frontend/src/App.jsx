import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <h1>WorkZen</h1>
        <nav>
          <Link to="/">Rooms</Link>
          <Link to="/bookings">Bookings</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
}

export default App;
