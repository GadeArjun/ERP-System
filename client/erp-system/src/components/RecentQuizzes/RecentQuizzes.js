import React from "react";
import "./RecentQuizzes.css";

function RecentQuizzes({ quizzes }) {
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div>
          <h2>All Quizzes</h2>
        </div>
        <div className="recent-quizzes-container">
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <div key={index} className="recent-quiz-card">
                <h3>{quiz.title}</h3>
                <p>
                  Status :
                  <span
                    style={{
                      color: `${
                        quiz.status !== "pending"
                          ? quiz.status === "complete"
                            ? "green"
                            : "blue"
                          : "red"
                      }`,
                    }}
                  >
                    {quiz.status}
                  </span>
                </p>
                <p>
                  Created Date: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
                <p>Questions: {quiz.questions.length}</p>
              </div>
            ))
          ) : (
            <p>No recent quizzes available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentQuizzes;
