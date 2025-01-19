import React from "react";
import "./AiFloatingButton.css";
import { useNavigate } from "react-router-dom";

function AiFloatingButton() {
  const navigate = useNavigate();

  const handleAiClick = () => {
    navigate("chat");
  };

  return (
    <div className="ai-floating-button" onClick={handleAiClick}>
      <div className="ai-icon">AI</div>
      <span className="ai-tooltip">Chat with AI</span>
    </div>
  );
}

export default AiFloatingButton;
