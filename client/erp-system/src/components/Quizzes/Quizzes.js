import React, { useState } from "react";
import axios from "axios";
import "./Quizzes.css";
// import RecentQuizzes from "../RecentQuizzes/RecentQuizzes";

function Quizzes({ setActiveTab, subjectId, setQuizzes, quizzes }) {
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);

  const startAddingQuestions = () => {
    if (!title.trim() || numQuestions <= 0) {
      alert("Please enter a valid quiz title and number of questions.");
      return;
    }
    setIsAddingQuestions(true);
  };

  const handleAddQuestion = () => {
    if (
      currentQuestion.trim() &&
      options.every((opt) => opt.trim()) &&
      correctAnswer
    ) {
      const newQuestion = { question: currentQuestion, options, correctAnswer };
      setQuestions([...questions, newQuestion]);

      // Reset fields for the next question
      setCurrentQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");

      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // If all questions are added, stop adding
      if (currentQuestionIndex + 1 === numQuestions) {
        setIsAddingQuestions(false);
      }
    } else {
      alert("Please fill all fields for the question.");
    }
  };

  const handleSaveQuiz = async () => {
    if (questions.length !== numQuestions) {
      alert("Please complete adding all questions before saving.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/add-quiz`,
        {
          title,
          questions,
          subjectId: subjectId._id,
          teacherAdminId: subjectId.teacherAdminId,
        }
      );
      // console.log(response);

      setQuizzes([...quizzes, response.data.quiz]);

      alert("Quiz saved successfully!");

      // Reset all fields after saving
      setTitle("");
      setNumQuestions(0);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setIsAddingQuestions(false);
      setActiveTab("home");
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz.");
    }
  };

  return (
    <>
      <div className="quizzes">
        <h2>Create a New Quiz</h2>

        {!isAddingQuestions && (
          <div className="quiz-setup">
            <label>
              Quiz Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </label>

            <label>
              Number of Questions:
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                placeholder="Enter number of questions"
                min="1"
              />
            </label>

            <button onClick={startAddingQuestions} className="start-btn">
              Start Adding Questions
            </button>
          </div>
        )}

        {isAddingQuestions && currentQuestionIndex < numQuestions && (
          <div className="question-section">
            <h3>
              Adding Question {currentQuestionIndex + 1} of {numQuestions}
            </h3>

            <label>
              Question:
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Enter question"
              />
            </label>

            <div className="options">
              {options.map((option, index) => (
                <label key={index}>
                  Option {String.fromCharCode(65 + index)}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      setOptions(
                        options.map((opt, i) =>
                          i === index ? e.target.value : opt
                        )
                      )
                    }
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                </label>
              ))}
            </div>

            <label>
              Correct Answer:
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="">Select correct option</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {String.fromCharCode(65 + index)}: {option}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={handleAddQuestion} className="add-btn">
              Add Question
            </button>
          </div>
        )}

        {currentQuestionIndex === numQuestions && (
          <div className="save-section">
            <h3>All questions have been added!</h3>
            <button onClick={handleSaveQuiz} className="save-btn">
              Save Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Quizzes;
