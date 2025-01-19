import React, { useState } from "react";
import "./Student.css";
import axios from "axios";

function Students({ studentsData, allPreviousQuizzes }) {
  // This will store the visibility state for each student's details
  // console.log(allPreviousQuizzes);

  const [showDetails, setShowDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [studentQuizPerformance, setStudentQuizPerformance] = useState([]);

  const handleToggleDetails = async (studentId) => {
    // Toggle the visibility of the student's details
    setLoading(true);
   setShowDetails((prevState) => {
     const updatedState = Object.keys(prevState).reduce((acc, key) => {
       acc[key] = false; // Set all other student states to false
       return acc;
     }, {});

     return {
       ...updatedState,
       [studentId]: !prevState[studentId], // Toggle only the specific student's state
     };
   });


    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/student-quiz-data`,
        {
          params: { studentId },
        }
      );
      // console.log(response);
      setStudentQuizPerformance(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  





  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student Performance</h1>
      {studentsData.map((student) => (
        <div key={student._id} className="student-card">
          <h3>{student.name}</h3>

          <button onClick={() => handleToggleDetails(student._id)}>
            {showDetails[student._id] ? "Hide Performance" : "See Performance"}
          </button>

          {!loading
            ? showDetails[student._id] && (
                <div className="student-details">
                  {studentQuizPerformance?.quizzes?.length
                    ? studentQuizPerformance?.quizzes?.map(
                        (studentQuizze, index) => {
                          {
                            return (
                              <>
                                <p>
                                  <strong>Title : </strong>
                                  {
                                    allPreviousQuizzes[
                                      allPreviousQuizzes.findIndex(
                                        (singleQuiz) =>
                                          studentQuizze.quizId ===
                                          singleQuiz._id
                                      )
                                    ].title
                                  }
                                </p>

                                <p>
                                  <strong>Score : </strong>
                                  {studentQuizze.score}
                                </p>
                                <hr
                                  style={{
                                    margin: "10px 0px",
                                    height: "5px",
                                    backgroundColor: "black",
                                  }}
                                />
                              </>
                            );
                          }
                        }
                      )
                    : "No any Quiz data available!"}
                </div>
              )
            : "Loading..."}
        </div>
      ))}
    </div>
  );
}

export default Students;
