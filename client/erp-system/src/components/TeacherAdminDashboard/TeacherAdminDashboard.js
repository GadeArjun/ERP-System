import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TeacherAdminDashboard.css";
import axios from "axios";
import userDataContext from "../../context/userDataContext";
import AiFloatingButton from "../AiFloatingButton/AiFloatingButton";
import DetailContainer from "../DetailContainer/DetailContainer";

function TeacherAdminDashboard() {
  const [teachersData, setTeacherData] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const { userData, setUserData } = useContext(userDataContext);

  const token = localStorage.getItem("token");
  // console.log({ token });

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    async function fetchSubjectTeacherAndStudentData(token) {
      try {
        // console.log({ token });

        const teachersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/teachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(teachersResponse.data);
        setTeacherData(teachersResponse.data.teacherData);
        setUserData(teachersResponse.data.teacherAdminData);

        const userId = teachersResponse.data.teacherAdminData._id;

        // console.log({ userId });

        const subjectResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/subjects`,
          {
            params: { userId },
          }
        );

        setSubjects(subjectResponse.data);

        // console.log({ subjectResponse });

        const studentResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/students`,
          {
            params: { userId },
          }
        );
        setStudents(studentResponse.data);

        // console.log(studentResponse);
      } catch (err) {
        console.log({ err });
      }
    }
    fetchSubjectTeacherAndStudentData(token);
  }, [token]);
  // console.log(subjects);

  return (
    <>
      <div className="teacher-admin-dashboard">
        <h1 className="dashboard-title">Teacher Admin Dashboard</h1>

        <div className="dashboard-info">
          <div className="info-card">
            <h3>Total Teachers</h3>
            <p>{teachersData.length}</p>
          </div>
          <div className="info-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>{" "}
          <div className="info-card">
            <h3>Total Subjects</h3>
            <p>{subjects.length}</p>
          </div>
        </div>

        <div className="dashboard-buttons">
          <Link to="/add-subject" className="button-link">
            <button className="add-button">Add Subject</button>
          </Link>
          <Link to="/add-teacher" className="button-link">
            <button className="add-button">Add Teacher</button>
          </Link>
        </div>

        <div className="dashboard-buttons">
          <Link to="/add-student-parent" className="button-link">
            <button className="add-button">Add Student</button>
          </Link>
        </div>
      </div>

     <DetailContainer subjects={subjects} teachersData={teachersData}  students={students}/>
      <AiFloatingButton />
    </>
  );
}

export default TeacherAdminDashboard;
