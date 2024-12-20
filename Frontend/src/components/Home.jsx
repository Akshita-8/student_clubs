// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/clubs');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setClubs(data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs. Please try again later.');
      }
    };

    fetchClubs();
  }, []);

  return (
    <Router>
      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <h1 className="logo">Student Clubs of SVECW</h1>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<h2>About Page</h2>} />
            <Route path="/contact" element={<h2>Contact Us Page</h2>} />
            <Route
              path="/"
              element={
                <div>
                  <h2 className="welcome-text">Welcome to Student Clubs of SVECW!</h2>
                  {error ? (
                    <p className="error-message">{error}</p>
                  ) : (
                    <div className="clubs-grid">
                      {clubs.map((club) => (
                        <div key={club._id} className="club-card">
                          <h3>{club.name}</h3>
                          <img
                            src={club.imageUrl}
                            alt={club.name}
                            className="club-image"
                          />
                          <p>{club.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;
