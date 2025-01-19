import React, { useState, useEffect } from "react";
import "./Quiz.css";
import axios from "axios";

function Quiz({
  quizTitle,
  quizDuration,
  questions,
  quizeId,
  setIsQuizStarted,
  studentId,
}) {
  // console.log(quizDuration);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizDuration * 60); // Duration in seconds
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && isStarted && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isStarted) {
      handleSubmit();
    }
  }, [timeLeft, isStarted, isSubmitted]);

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle answer selection
  const handleAnswerSelection = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsStarted(false);
      setIsSubmitted(false);
      setIsQuizStarted(false);
    }, 2000);
    sendCompletedQuizDetails(studentId, quizeId, calculatedScore);
  };

  async function sendCompletedQuizDetails(studentId, quizId, score) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/add-completed-quiz`,
        {
          studentId,
          quizId,
          score,
        }
      );
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="quiz-container" id="quiz-container">
      <h1>{quizTitle}</h1>
      {!isStarted ? (
        <div className="start-section">
          <h2>Get ready to test your knowledge!</h2>
          <button className="start-button" onClick={() => setIsStarted(true)}>
            Start Quiz
          </button>
          <button
            className="start-button"
            onClick={() => {
              setIsStarted(false);
              setIsSubmitted(false);
              setIsQuizStarted(false);
            }}
          >
            Cancel Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-timer">
            Time Remaining: {formatTime(timeLeft)}
          </div>

          {!isSubmitted ? (
            <div>
              <div className="question-section">
                <h2>Question {currentQuestionIndex + 1}</h2>
                <p>{questions[currentQuestionIndex].question}</p>
                <div className="options-container">
                  {questions[currentQuestionIndex].options.map(
                    (option, idx) => (
                      <button
                        key={idx}
                        className={`option-button ${
                          selectedAnswers[currentQuestionIndex] === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerSelection(currentQuestionIndex, option)
                        }
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="navigation-buttons">
                <button
                  className="nav-button"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="nav-button"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    )
                  }
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="result-section">
              <h2>Quiz Completed</h2>
              <p>
                You scored {score} out of {questions.length}.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
