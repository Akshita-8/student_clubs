// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Handle changes in the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    // Basic validation for empty fields
    if (!formData.email || !formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Both email and password are required.',
      }));
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:4000/api/users/login', formData);

      // If login is successful, save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Display success message
      setSuccess('Login successful!');

      // Redirect to the homepage or another page
      window.location.href = '/'; // Adjust this based on your routing structure
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach((err) => {
          apiErrors[err.param] = err.msg;
        });
        setErrors(apiErrors);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'An error occurred. Please try again later.',
        }));
        console.error('Login error', error);
      }
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
          }}
        >
          Login
        </button>
      </form>

      {/* General Error or Success message */}
      {errors.general && <p style={{ color: 'red', marginTop: '20px' }}>{errors.general}</p>}
      {success && <p style={{ color: 'green', marginTop: '20px' }}>{success}</p>}
    </div>
  );
};

export default Login;
