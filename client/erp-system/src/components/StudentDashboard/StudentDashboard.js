import React, { useEffect, useRef, useState } from "react";
import "./StudentDashboard.css";
import SubjectCard from "../SubjectCard/SubjectCard";
import AiFloatingButton from "../AiFloatingButton/AiFloatingButton";
import axios from "axios";
import QuizScheduleCard from "../QuizScheduleCard/QuizScheduleCard";
import UploadedAssignmentsCard from "../UploadedAssignmentsCard/UploadedAssignmentsCard";
import Quiz from "../Quiz/Quiz";
import CompletedQuizzes from "../CompletedQuizzes/CompletedQuizzes";
import { useNavigate } from "react-router-dom";
import StudentAttendanceScanner from "../StudentAttendanceScanner/StudentAttendanceScanner";

function StudentDashboard() {
  const token = localStorage.getItem("token");

  const [subjects, setSubjects] = useState([]);
  const [userData, setUserData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [updatedAssignments, setUpdatedAssignments] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [scheduleQuizezes, setScheduleQuizezes] = useState([]);
  const [filteredScheduleQuizzes, setFilteredScheduleQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  // const [score, setScore] = useState("You have not attempted this quiz");
  const [selectedQuize, setSelectedQuize] = useState("");

  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const [isSelect, setIsSelect] = useState(false);
  const [isAttendanceStart, setIsAttendanceStart] = useState(false);

  const navigate = useNavigate();

  // getting studetn id

  useEffect(() => {
    async function getStudentData(token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getStudentData(token);
  }, [token]);

  // Fetch Subjects
  useEffect(() => {
    async function getSubjects() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student-subjects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);

        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    getSubjects();
  }, [token]);

  // Fetch Assignments
  useEffect(() => {
    async function getAssignments() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student-assignments`,
          {
            params: {
              std_class: subjects[0]?.class,
              teacherAdminId: subjects[0]?.teacherAdminId,
            },
          }
        );
        // console.log(response.data);

        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }

    getAssignments();
  }, [subjects]);

  // Fetch Quizzes
  useEffect(() => {
    async function getQuizzes() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student-quizzes`,
          {
            params: {
              teacherAdminId: subjects[0]?.teacherAdminId,
            },
          }
        );

        // console.log(response.data);

        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }
    getQuizzes();
  }, [subjects]);

  // get completed quizzes score and other detais
  useEffect(() => {
    async function getStudentCompleteQuizeScore(studentId) {
      // const StudentCompleteQuizeScore = 0;
      try {
        // console.log(studentId);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student-quiz-data`,
          {
            params: { studentId },
          }
        );
        // console.log(response.data.quizzes);
        // console.log(response.data);
        setCompletedQuizzes(response.data.quizzes);
      } catch (err) {
        console.log(err);
      }
    }

    getStudentCompleteQuizeScore(userData?.id);
  }, [userData, subjects, isQuizStarted]);

  // get schedule quize data
  useEffect(() => {
    async function getScheduleQuizzes(teacherAdminId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/get-schedule-quiz`,
          {
            params: { teacherAdminId },
          }
        );
        setScheduleQuizezes(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getScheduleQuizzes(userData?.teacherAdminId);
  }, [userData]);

  useEffect(() => {
    //
    setIsAttendanceStart(false);

    function filterAssignmentsAndQuzzes(selectedSubjectId) {
      try {
        const filteredAssignment = assignments.filter(
          (assignment) => assignment.subjectId === selectedSubjectId
        );
        // console.log(filteredAssignment, assignments);
        setUpdatedAssignments(filteredAssignment);

        const filteredScheduleQuize = scheduleQuizezes.filter(
          (scheduleQuize) => scheduleQuize.subjectId === selectedSubjectId
        );

        setFilteredScheduleQuizzes(filteredScheduleQuize);
        // console.log(filteredScheduleQuize);
      } catch (err) {
        console.log(err);
      }
    }

    filterAssignmentsAndQuzzes(selectedSubjectId);
  }, [selectedSubjectId, assignments, scheduleQuizezes, quizzes]);

  const [selectedQuizeToStart, setSelectedQuizeToStart] = useState([]);

  useEffect(() => {
    try {
      const quizToStart = quizzes.filter((quiz) => quiz._id === selectedQuize);
      // console.log(quizToStart);
      setSelectedQuizeToStart(quizToStart);
    } catch (err) {
      console.log(err);
    }
  }, [selectedQuize]);

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Student Dashboard</h1>
      </header>
      <div className="dashboard-content">
        {/* Subjects Section */}
        <h2>Your Subjects</h2>
        <div className="subjects-container">
          {subjects.map((subject) => (
            <SubjectCard
              setIsSelect={setIsSelect}
              key={subject._id}
              teacherAdminId={subjects[0]?.teacherAdminId}
              subjectId={subject._id}
              subjectName={subject.subjectName}
              setSelectedSubjectId={setSelectedSubjectId}
            />
          ))}
        </div>
        {/* Uploaded Assignments Section */}
        {isSelect ? (
          <div>
            <button
              className="mark-attendance-btn"
              onClick={() => setIsAttendanceStart((prev) => !prev)}
            >
              {isAttendanceStart ? "Close Attendance" : "Mark Your Addentance"}
            </button>
            {isAttendanceStart ? (
              <div className="dashboard-section">
                <StudentAttendanceScanner
                  studentId={userData.id}
                  subjectId={selectedSubjectId}
                  setIsAttendanceStart={setIsAttendanceStart}
                />
              </div>
            ) : (
              ""
            )}

            <div className="dashboard-section">
              <h2>Uploaded Assignments / Notes</h2>
              <div>
                {updatedAssignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <UploadedAssignmentsCard
                      key={assignment._id}
                      fileName={assignment.fileName}
                      fileUrl={`${
                        process.env.REACT_APP_BACKEND_URL + assignment.fileUrl
                      }`}
                    />
                  ))
                ) : (
                  <p>"No assignments uploaded yet." </p>
                )}
              </div>
            </div>

            {/* Scheduled Quizzes Section */}

            <div className="dashboard-section">
              <h2>Scheduled Quizzes</h2>
              <ul>
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => {
                    return filteredScheduleQuizzes.map((scheduleQuiz) => {
                      if (
                        quiz._id === scheduleQuiz.quizId &&
                        completedQuizzes.find(
                          (completedQuiz) =>
                            completedQuiz.quizId !== scheduleQuiz.quizId
                        )
                      ) {
                        return (
                          <QuizScheduleCard
                            setIsQuizStarted={setIsQuizStarted}
                            setSelectedQuize={setSelectedQuize}
                            key={scheduleQuiz._id}
                            quizTitle={quiz.title}
                            quizStartDate={scheduleQuiz.quizStartDate}
                            availabilityTime={scheduleQuiz.availabilityTime}
                            quizDuration={scheduleQuiz.quizDuration}
                            stdClass={scheduleQuiz.subjectId}
                            quizId={scheduleQuiz.quizId}
                          />
                        );
                      } else {
                        return "";
                      }
                    });
                  })
                ) : (
                  <p>No quizzes scheduled yet.</p>
                )}
              </ul>
            </div>

            {/* completed quize section  */}
            <div className="dashboard-section">
              <h2>Completd Quizzes</h2>
              <CompletedQuizzes
                subjectId={selectedSubjectId}
                quizzes={quizzes}
                completedQuizzes={completedQuizzes}
              />
            </div>
            {isQuizStarted ? (
              <Quiz
                quizeId={selectedQuize}
                studentId={userData.id}
                setIsQuizStarted={setIsQuizStarted}
                quizTitle={selectedQuizeToStart[0]?.title}
                quizDuration={20}
                questions={selectedQuizeToStart[0]?.questions}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <p style={{ color: "blueviolet", fontSize: "20px" }}>
            Select subject to give attendance and see the Notes, Schedule
            quizzes and Completed quizzes.
          </p>
        )}
      </div>
      <AiFloatingButton />
      <button
        className="std-doubt-forum"
        onClick={() => navigate("doubt-forum")}
      >
        Doubt Forum
      </button>
    </div>
  );
}

export default StudentDashboard;
