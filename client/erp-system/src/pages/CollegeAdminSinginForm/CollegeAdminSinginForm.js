import React, { useContext, useState } from "react";
import "./CollegeAdminSigninForm.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import userDataContext from "../../context/userDataContext";

function CollegeAdminSigninForm() {
  const { setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(formData);
      
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/college-admin-login`,
        formData
      );
      // console.log(formData);

      if (+response.status === 200) {
        alert("Login successful!");

        // console.log("Admin Data:", response.data);
        // console.log(response.data);

        setUserData(response.data.collegeAdmin);

        localStorage.setItem("role", response?.data?.collegeAdmin?.role);
        localStorage.setItem("college_admin_token", response?.data?.token);
        // console.log(response?.data?.token);

        navigate("/dashboard");
      }
    } catch (error) {
      if (error.status) {
        alert(error?.response?.message || "Invalid crediantial");
      } else {
        alert("An error occurred while signing in. Please try again.");
      }
    }
  };

  return (
    <div className="college-signin-container">
      <form className="college-signin-form" onSubmit={handleSubmit}>
        <h2>College Admin Sign-In</h2>

        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="signin-btn">
          Sign In
        </button>
        <p>
          Don’t have an account?
          <Link to={"/college-admin-signup"}> Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default CollegeAdminSigninForm;
