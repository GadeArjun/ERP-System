import React, { useEffect, useState } from "react";
import "./TeacherDashboard.css";
import Assignments from "../Assignments/Assignments";
import Students from "../Students/Students";
import Attendance from "../Attendance/Attendance";
import Quizzes from "../Quizzes/Quizzes";
import axios from "axios";
import TeacherHome from "../TeacherHome/TeacherHome";
import AiFloatingButton from "../AiFloatingButton/AiFloatingButton";
import DoubtForum from "../../pages/DoubtForum/DoubtForum";
import { useNavigate } from "react-router-dom";
// import ParentCommunication from "./ParentCommunication";

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [subjectId, setSubjectId] = useState({});
  const [studetnData, setStudetnData] = useState([]);
  const [teacherAdminId, setTeacherAdminId] = useState("");

  const token = localStorage.getItem("token");

  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  // fetch student data

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/students-details`,
          {
            params: { teacherAdminId, class: subjectId.class },
          }
        );
        // console.log(response);
        setStudetnData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStudentData();
  }, [teacherAdminId, subjectId]);

  // Fetch recent quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // console.log(subjectId._id);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/get-quizzes`,
          {
            params: { subjectId: subjectId._id },
          }
        );

        // console.log(response.data);

        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [subjectId]);

  useEffect(() => {
    async function getSubjectData(token) {
      // console.log(token);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/subject`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setTeacherAdminId(response.data.teacherAdminId);
      setSubjectId(response.data);
    }
    getSubjectData(token);
  }, [token]);

  const renderContent = () => {
    switch (activeTab) {
      case "assignments":
        return (
          <Assignments
            std_class={subjectId.class}
            subjectId={subjectId._id}
            teacherAdminId={teacherAdminId}
          />
        );
      case "students":
        return (
          <Students allPreviousQuizzes={quizzes} studentsData={studetnData} />
        );
      case "attendance":
        return <Attendance subjectId={subjectId} />;

      case "quizzes":
        // console.log(subjectId);
        return (
          <Quizzes
            quizzes={quizzes}
            subjectId={subjectId}
            setActiveTab={setActiveTab}
            setQuizzes={setQuizzes}
          />
        );

      // case "parentCommunication":
      //   return <ParentCommunication />;
      default:
        return (
          <TeacherHome
            quizzes={quizzes}
            std_class={subjectId.class}
            teacherAdminId={subjectId.teacherAdminId}
            subjectId={subjectId._id}
          />
        );
    }
  };

  return (
    <div className="teacher-dashboard">
      <nav className="sidebar">
        <h2>Teacher Dashboard</h2>
        <ul>
          <li onClick={() => setActiveTab("home")}>Home</li>
          <li onClick={() => setActiveTab("assignments")}>Assignments</li>
          <li onClick={() => setActiveTab("students")}>Students</li>
          <li onClick={() => setActiveTab("attendance")}>Attendance</li>
          <li onClick={() => setActiveTab("quizzes")}>Quizzes</li>
          <li onClick={() => navigate("doubt-forum")}>Doubt Forum</li>
        </ul>
      </nav>
      <main className="content">{renderContent()}</main>
      <AiFloatingButton />
    </div>
  );
}

export default TeacherDashboard;
