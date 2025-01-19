import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./CollegeAdminDashboard.css"; // Import CSS file for styling
import axios from "axios";
import userDataContext from "../../context/userDataContext";
import AiFloatingButton from "../AiFloatingButton/AiFloatingButton";

function CollegeAdminDashboard() {
  const [teacherData, setTeacherData] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const { setUserData } = useContext(userDataContext);

  const token = localStorage.getItem("college_admin_token");

  useEffect(() => {
    async function fetchAdminTeacherAndStudentData(token) {
      try {
        // console.log({ token });

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin-teachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.teachers);
        setTeacherData(response.data.teacherAdminData);
        setUserData(response.data.collegeAdminData);
        // console.log({ teacherData });
      } catch (err) {
        console.log({ err });
      }
    }
    fetchAdminTeacherAndStudentData(token);
  }, [token]);

  const handleRemoveTeacher = async (teacherId) => {
    // console.log(teacherId);
    setTeacherData(() =>
      teacherData.filter((teacher) => teacher._id !== teacherId)
    );

    // console.log(teacherData);
  };

  return (
    <div className="admin-dashboard">
      <h1>College Admin Dashboard</h1>
      <h3>Total Students: {studentCount}</h3>
      <h3>Total Teachers: {teacherData.length}</h3>

      {/* Button for adding a new teacher */}
      <Link to="/add-admin-teacher" className="add-teacher-button">
        Add New Admin Teacher
      </Link>

      <div className="teacher-list">
        <h3>Admin Teachers</h3>
        {teacherData?.map((teacher) => (
          <div key={teacher._id} className="teacher-item">
            <span>
              {teacher.name} ({teacher.email})
            </span>
            <button
              className="remove-button"
              onClick={() => handleRemoveTeacher(teacher._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <AiFloatingButton />
    </div>
  );
}

export default CollegeAdminDashboard;
