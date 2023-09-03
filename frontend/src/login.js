import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      const token = response.data.token;
      console.log('token:', token);
      // Save the token to local storage or cookies for future authenticated requests
      // Redirect to the user's dashboard or protected pages
      navigate("/dashboard"); // Use navigate to navigate to the dashboard
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
