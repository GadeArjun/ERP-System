import React, { useState, useEffect } from "react";
import "./TeacherHome.css";
import RecentQuizzes from "../RecentQuizzes/RecentQuizzes";
import axios from "axios";

function TeacherHome({ quizzes, std_class, teacherAdminId, subjectId }) {
  const [showQuizList, setShowQuizList] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [quizStartDate, setQuizStartDate] = useState("");

  const handleScheduleQuiz = async () => {
    // Ensure all details are filled
    if (!selectedQuiz || !availabilityTime || !quizDuration || !quizStartDate) {
      alert("Please fill all the details.");
      return;
    }

    // Ensure the quiz start date is today or later
    const today = new Date();
    const selectedDate = new Date(quizStartDate);
    // console.log(today, selectedDate, selectedDate < today);

    if (selectedDate < today) {
      alert("Quiz start date must be later than today's date.");
      return;
    }

    // console.log({
    //   quizId: selectedQuiz,
    //   availabilityTime,
    //   quizDuration,
    //   quizStartDate,
    //   std_class,
    //   teacherAdminId,
    //   subjectId,
    // });

    // API call to schedule quiz
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/quiz-schedule`,
        {
          quizId: selectedQuiz,
          availabilityTime,
          quizDuration,
          quizStartDate,
          std_class,
          teacherAdminId,
          subjectId,
        }
      );

      // console.log(response);

      if (response.status === 201) {
        alert("Quiz scheduled successfully!");
        setShowQuizList(false);
        setSelectedQuiz(null);
        setAvailabilityTime("");
        setQuizDuration("");
        setQuizStartDate("");
      } else {
        alert("Error scheduling the quiz.");
      }
    } catch (error) {
      console.error("Error scheduling the quiz:", error);
    }
  };

  return (
    <div className="home-container">
      <button
        className="schedule-button"
        onClick={() => setShowQuizList(!showQuizList)}
      >
        Schedule Quiz
      </button>

      {showQuizList && (
        <div className="quiz-scheduler">
          <h2>Select a Quiz</h2>
          <ul className="quiz-list">
            {quizzes.length > 0 ? (
              quizzes.map(
                (quiz) =>
                  quiz.status === "pending" && (
                    <li
                      key={quiz._id}
                      className={`quiz-item ${
                        selectedQuiz === quiz._id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedQuiz(quiz._id)}
                    >
                      {quiz.title}
                    </li>
                  )
              )
            ) : (
              <p>No quizzes available.</p>
            )}
          </ul>

          {selectedQuiz && (
            <div className="quiz-details">
              <h3>Set Scheduling Details</h3>
              <label>
                Quiz Start Date:
                <input
                  type="date"
                  value={quizStartDate}
                  onChange={(e) => setQuizStartDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Availability Time (e.g., 1h):
                <input
                  type="text"
                  value={availabilityTime}
                  onChange={(e) => setAvailabilityTime(e.target.value)}
                  placeholder="1h, 30m, etc."
                  required
                />
              </label>
              <label>
                Quiz Duration (e.g., 20m):
                <input
                  type="text"
                  value={quizDuration}
                  onChange={(e) => setQuizDuration(e.target.value)}
                  placeholder="20m, 15m, etc."
                  required
                />
              </label>
              <button className="submit-button" onClick={handleScheduleQuiz}>
                Schedule Quiz
              </button>
            </div>
          )}
        </div>
      )}
      <RecentQuizzes quizzes={quizzes} />
    </div>
  );
}

export default TeacherHome;
