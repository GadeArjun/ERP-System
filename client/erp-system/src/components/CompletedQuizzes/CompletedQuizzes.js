import React from "react";
import "./CompletedQuizzes.css";

function CompletedQuizzes({ completedQuizzes, quizzes, subjectId }) {
  // console.log(completedQuizzes, quizzes);

  return (
    <div className="completed-quizzes-container">
      <div className="quiz-cards">
        {quizzes.map((quiz) => {
          return completedQuizzes.map((completedQuiz, index) => {
            if (
              quiz._id === completedQuiz.quizId &&
              subjectId === quiz.subjectId
            ) {
              return (
                <div key={index} className="quiz-card">
                  <h2 className="quiz-title">{quiz.title}</h2>
                  <p className="quiz-score">
                    Score: {completedQuiz.score} out of {quiz.questions?.length}
                  </p>
                </div>
              );
            } else {
              return;
            }
          });
        })}
      </div>
    </div>
  );
}

export default CompletedQuizzes;
