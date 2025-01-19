import React, { useContext, useEffect, useState } from "react";
import "./AddAdminTeacherForm.css";
import userDataContext from "../../context/userDataContext";
import axios from "axios";

function AddAdminTeacherForm() {
  const { userData, setUserData } = useContext(userDataContext);
  const token = localStorage.getItem("college_admin_token");

  // console.log(userData);

  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    branchCode: "",
    collegeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    async function getCollegeAdminData(token) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-college`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getCollegeAdminData(token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTeacherDetails = {
      ...teacherDetails,
      collegeId: userData?._id,
    };

    // console.log(updatedTeacherDetails);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher-admin`,
        updatedTeacherDetails
      );
      // console.log(response.data);
      alert(response.data.message);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
    }

    // console.log("Teacher added:", updatedTeacherDetails);
  };

  return (
    <div className="add-teacher-form-container">
      <h1 className="form-title">Add New Admin Teacher</h1>
      <form className="add-teacher-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={teacherDetails.name}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={teacherDetails.email}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          value={teacherDetails.password}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="branchCode">
          Branch Code
        </label>
        <input
          type="text"
          id="branchCode"
          name="branchCode"
          className="form-input"
          value={teacherDetails.branchCode}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Add Teacher
        </button>
      </form>
    </div>
  );
}

export default AddAdminTeacherForm;
