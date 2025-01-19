import React, { useState, useRef } from "react";
import "./ChatWithAI.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";

const ChatWithAI = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setLoading(true);

      // Add user's message to chat
      const newMessage = { sender: "User", content: userMessage };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Scroll chat to the bottom
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, 50);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/chat-with-ai`,
          {
            userMessage: userMessage,
          }
        );
        console.log(response);
        const aiResponse = response.data;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "AI", content: aiResponse },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "AI",
            content: "Something went wrong. Please try again later.",
          },
        ]);
      } finally {
        setLoading(false);
        setUserMessage("");
      }
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>AI Chat Assistant</h1>
      </header>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "User" ? "user-message" : "ai-message"
            }`}
          >
            <strong>{msg.sender}:</strong>
            <SyntaxHighlighter
              language="javascript"
              wrapLongLines={true}
              style={docco}
            >
              {msg.content}
            </SyntaxHighlighter>
          </div>
        ))}
        {loading && (
          <div className="chat-message ai-message">
            <strong>AI:</strong> Typing...
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type your question here..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="chat-input"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;
