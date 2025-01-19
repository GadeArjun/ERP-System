import React, { useState } from "react";
import "./StudentSignin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/student-login`,
        { email, password }
      );

      alert(response.data.message);
      // console.log(response.data);

      localStorage.setItem("name", response.data.student.name);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.student.role);

      // console.log(response);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }

    // console.log("Student Sign In:", { email, password });
  };

  return (
    <div className="student-signin-container">
      <form className="student-signin-form" onSubmit={handleSubmit}>
        <h2 className="student-signin-title">Student Sign In</h2>
        <div className="student-signin-field">
          <label htmlFor="student-email" className="student-signin-label">
            Email:
          </label>
          <input
            type="email"
            id="student-email"
            className="student-signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="student-signin-field">
          <label htmlFor="student-password" className="student-signin-label">
            Password:
          </label>
          <input
            type="password"
            id="student-password"
            className="student-signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="student-signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default StudentSignin;
