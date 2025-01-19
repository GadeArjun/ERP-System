import React, { useState } from "react";
import "./ParentSignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ParentSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/parent-login`,
        { email, password }
      );

      alert(response.data.message);
      // console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "Parent");

      // console.log(response);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }

    // console.log("Parent Sign In:", { email, password });
  };

  return (
    <div className="parent-signin-container">
      <form className="parent-signin-form" onSubmit={handleSubmit}>
        <h2 className="parent-signin-title">Parent Sign In</h2>
        <div className="parent-signin-field">
          <label htmlFor="parent-email" className="parent-signin-label">
            Email:
          </label>
          <input
            type="email"
            id="parent-email"
            className="parent-signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="parent-signin-field">
          <label htmlFor="parent-password" className="parent-signin-label">
            Password:
          </label>
          <input
            type="password"
            id="parent-password"
            className="parent-signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="parent-signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default ParentSignIn;
