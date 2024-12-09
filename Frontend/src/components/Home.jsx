// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const Home = () => {
  return (
    <Router>
      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <h1 className="logo">Student Clubs of SVECW</h1>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link> {/* Added Home Link */}
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">Contact Us</Link>
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
                <h2 className="welcome-text">Welcome to Student Clubs of SVECW!</h2>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;
