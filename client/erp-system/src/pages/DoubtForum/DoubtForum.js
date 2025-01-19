import React, { useState, useEffect } from "react";
import "./DoubtForum.css";
import { io } from "socket.io-client";
import axios from "axios";

const DoubtForum = () => {
  const name = localStorage.getItem("name");

  const socket = io(process.env.REACT_APP_SOCKET_URL);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const userId = name;

  const [view, setView] = useState("ask");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});

  // Fetch questions from the server on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [BASE_URL]);

  // Handle submitting a new question
  const handleAskQuestion = async () => {
    if (newQuestion.trim()) {
      try {
        const response = await axios.post(`${BASE_URL}/add-question`, {
          question: newQuestion,
          userId,
        });
        setNewQuestion("");
        socket.emit("newQuestion", response.data);
      } catch (error) {
        console.error("Error adding question:", error);
      }
    }
  };

  // Handle submitting a new answer
  const handleAddAnswer = async (questionId) => {
    const answer = answerInputs[questionId]?.trim();
    if (answer) {
      try {
        const response = await axios.post(`${BASE_URL}/add-answer`, {
          questionId,
          answer,
          userId,
        });

        const updatedQuestion = response.data;
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q._id === questionId ? updatedQuestion : q))
        );
        setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
        socket.emit("newAnswer", updatedQuestion);
      } catch (error) {
        console.error("Error adding answer:", error);
      }
    }
  };

  // Update questions in real-time when notified via socket
  useEffect(() => {
    socket.on("newQuestion", (question) => {
      setQuestions((prevQuestions) => [...prevQuestions, question]);
    });

    socket.on("newAnswer", (updatedQuestion) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === updatedQuestion._id ? updatedQuestion : q
        )
      );
    });

    return () => {
      socket.off("newQuestion");
      socket.off("newAnswer");
    };
  }, []);

  return (
    <div className="doubt-forum">
      <h1>Doubt Forum</h1>

      <div className="toggle-view">
        <button
          onClick={() => setView("ask")}
          className={view === "ask" ? "active" : ""}
        >
          Ask a Question
        </button>
        <button
          onClick={() => setView("answer")}
          className={view === "answer" ? "active" : ""}
        >
          Provide a Solution
        </button>
      </div>

      {/* Ask a Question */}
      {view === "ask" && (
        <div className="ask-question">
          <textarea
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button key={userId} onClick={handleAskQuestion}>
            Submit Question
          </button>
        </div>
      )}

      {/* Provide a Solution */}
      {view === "answer" && (
        <div className="provide-solution">
          <h2>Questions</h2>
          {questions.map((q) => (
            <div key={q._id} className="question-card">
              <p>
                <strong>Question:</strong> {q.question}
              </p>
              <p>
                <strong>Asked by : </strong>
                {"Anonymous"}
              </p>
              <div className="answers">
                {q.answers.map((ans, index) => (
                  <p key={index}>
                    <strong>Answered by : </strong>
                    {ans.userId || "NA"} <br /> {ans.answer}
                  </p>
                ))}
              </div>

              {/* Answer section */}
              <textarea
                placeholder="Type your solution here..."
                value={answerInputs[q._id] || ""}
                onChange={(e) =>
                  setAnswerInputs((prev) => ({
                    ...prev,
                    [q._id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleAddAnswer(q._id)}>
                Submit Answer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoubtForum;
