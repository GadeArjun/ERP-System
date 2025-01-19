import React, { useState } from "react";
import "./CollegeAdminSignupForm.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CollegeAdminSignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    collegeAddress: "",
    collegeEmail: "",
    collegePhone: "",
    adminEmail: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/college-admin`,
        formData
      );
      if (response.status === 201) {
        alert("Sign up successfull.");

        navigate("/college-admin-signin");
      } else {
        alert("Error while registration try later.");
      }
      // console.log("Form submitted:", response.data);
    } catch (error) {
      // console.error(error);
      console.log(error);
      alert(error?.response?.data);
    }
  };

  return (
    <div className="college-signup-container">
      <form className="college-signup-form" onSubmit={handleSubmit}>
        <h2>College Admin Signup</h2>

        <div className="form-group">
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            placeholder="Enter the name of the college"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeCode">College Code</label>
          <input
            type="text"
            id="collegeCode"
            name="collegeCode"
            value={formData.collegeCode}
            onChange={handleChange}
            placeholder="Enter the unique college code"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeAddress">College Address</label>
          <input
            type="text"
            id="collegeAddress"
            name="collegeAddress"
            value={formData.collegeAddress}
            onChange={handleChange}
            placeholder="Enter the college's address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeEmail">College Email</label>
          <input
            type="email"
            id="collegeEmail"
            name="collegeEmail"
            value={formData.collegeEmail}
            onChange={handleChange}
            placeholder="Enter the official college email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegePhone">College Phone</label>
          <input
            type="number"
            id="collegePhone"
            name="collegePhone"
            value={formData.collegePhone}
            onChange={handleChange}
            placeholder="Enter the contact phone number"
            required
            min={1000000000}
            max={9999999999}
          />
        </div>

        <h3>Admin Details</h3>

        <div className="form-group">
          <label htmlFor="adminEmail">Admin Email</label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            placeholder="Enter the admin's email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adminPassword">Admin Password</label>
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            value={formData.adminPassword}
            onChange={handleChange}
            placeholder="Enter a strong password"
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <p>
          Already have an account?
          <Link to={"/college-admin-signin"}> Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default CollegeAdminSignupForm;
