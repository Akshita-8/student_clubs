// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:4000/api/users/register", formData);
      setSuccess("User registered successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach((err) => {
          apiErrors[err.path] = err.msg;
        });
        setErrors(apiErrors);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      {success && <p className="success">{success}</p>}
    </div>
  );
};
export default Register;