import React, { useEffect, useState } from "react";
import "./ParentDashboard.css";
import axios from "axios";

function ParentDashboard() {
  const token = localStorage.getItem("token");
  // console.log(token);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [totalAttendanceData, setTotalAttendanceData] = useState([]);
  const [student, setStudent] = useState([]);

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
        setStudent(response?.data?.student);
        // console.log(response?.data);
        
        setSubjects(response?.data?.subjects);
        setAttendance(response?.data?.attendance);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    getStudentData(token);
  }, [token]);

  useEffect(() => {
    async function getAttendanceBySubjectId(subjects) {
      try {
        const responses = await Promise.all(
          subjects?.map(async (subject) => {
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/attendance`,
              {
                params: { subjectId: subject?._id },
              }
            );
            // console.log(response);

            return {
              subjectId: subject?._id,
              daysOfAttendance: response?.data?.daysOfAttendance,
            };
          })
        );

        // Store all the responses in the state
        // console.log({ responses });
        setTotalAttendanceData(responses);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    }

    if (subjects && subjects.length > 0) {
      getAttendanceBySubjectId(subjects);
    }
  }, [subjects]);
  // console.log(totalAttendanceData);

  return (
    <div className="parent-dashboard-container">
      <header className="parent-dashboard-header">
        <h1>Parent Dashboard</h1>
        <p>Monitor your child's progress in real-time.</p>
      </header>
      <div className="student-progress-section">
        {student.map((student, index) => (
          <div className="student-card-attendance" key={index}>
            <h2 className="student-name">{student?.name}</h2>
            <div className="progress-container">
              {subjects?.map((subject, idx) => (
                <div className="subject-progress" key={idx}>
                  <h3 className="subject-name">{subject?.subjectName.replace(subject?.teacherAdminId , "")}</h3>
                  <div className="progress-bar-container">
                    <p>Attendance:</p>
                    <div className="progress-bar">
                      {attendance?.attendance?.map((att, i) => {
                        if (att?.subjectId === subject?._id) {
                          return (
                            <div
                              key={i}
                              className="progress"
                              style={{
                                width: `${
                                  (att?.records?.length /
                                    totalAttendanceData?.find(
                                      (totalAttendance) =>
                                        totalAttendance?.subjectId ===
                                        subject?._id
                                    )?.daysOfAttendance) *
                                  100
                                }%`,
                              }}
                            >
                              {(
                                (att?.records?.length /
                                  totalAttendanceData?.find(
                                    (totalAttendance) =>
                                      totalAttendance.subjectId === subject?._id
                                  )?.daysOfAttendance) *
                                100
                              )?.toFixed(2)}
                              %
                            </div>
                          );
                        } else {
                          return "";
                        }
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParentDashboard;

// 🔔
