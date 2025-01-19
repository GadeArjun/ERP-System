import React, { useState } from "react";
import axios from "axios";
import "./TeacherAdminSingin.css";
import { useNavigate } from "react-router-dom";

function TeacherAdminSingin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher-admin-login`,
        credentials
      );

      alert(response.data.message);
      localStorage.setItem("role", response.data.teacherAdmin.role);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      // console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="teacher-admin-signin-container">
      <h1>Teacher Admin Sign In</h1>
      <form className="teacher-admin-signin-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default TeacherAdminSingin;
