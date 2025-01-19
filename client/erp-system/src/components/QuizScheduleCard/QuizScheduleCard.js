import React from "react";
import "./QuizScheduleCard.css";

function QuizScheduleCard({
  quizTitle,
  quizStartDate,
  availabilityTime,
  quizDuration,
  stdClass,
  setSelectedQuize,
  quizId,
  setIsQuizStarted,
}) {
  // Calculate remaining time
  const today = new Date();
  const quizDate = new Date(quizStartDate);
  const timeDifference = quizDate - today;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  // console.log(daysRemaining);

  return (
    <div
      className="quiz-schedule-card"
      onClick={() => {
        setIsQuizStarted(true);
        setSelectedQuize(quizId);

        setTimeout(() => {
          const quiz = document.getElementById("quiz-container");

          // console.log(quiz);
          if (quiz) {
            quiz.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }}
    >
      <span
        className={`${daysRemaining > 0 ? "" : "quize-today-bliker"}`}
      ></span>
      <span className="tooltip-schedule-card">Click To Start Quiz</span>
      <h3 className="quiz-title">{quizTitle}</h3>
      <div className="quiz-details">
        <p>
          <strong>Start Date:</strong>
          {new Date(quizStartDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Time Remaining:</strong>
          {daysRemaining > 0 ? `${daysRemaining} days left` : "Today!"}
        </p>
        <p>
          <strong>Availability Time:</strong> {availabilityTime}
        </p>
        <p>
          <strong>Quiz Duration:</strong> {quizDuration}
        </p>
        <p>
          <strong>Class:</strong> {stdClass}
        </p>
      </div>
    </div>
  );
}

export default QuizScheduleCard;
