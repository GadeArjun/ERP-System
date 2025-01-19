import React, { useContext, useState } from "react";
import "./TeacherSignInForm.css";
import axios from "axios";
import userDataContext from "../../context/userDataContext";
import { useNavigate } from "react-router-dom";

function TeacherSignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUserData } = useContext(userDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher-login`,
        formData
      );

      // console.log(response, response.data.token);
      setUserData(response.data.teacher);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.teacher.name);

      localStorage.setItem("role", response.data.teacher.role);

      alert(response.data.msg);
      navigate("/dashboard");
    } catch (err) {
      // console.log(err);
      alert(err.response.data);
    }

    // console.log("Form submitted:", formData);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="signin-title">Teacher Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default TeacherSignInForm;
