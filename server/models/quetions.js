const mongoose = require("mongoose");

// Answer Schema
const AnswerSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User who answered
  answer: { type: String, required: true }, // Answer content
  timestamp: { type: Date, default: Date.now }, // Timestamp
});

// Question Schema
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true }, // Question content
  userId: { type: String, required: true }, // User who asked the question
  answers: [AnswerSchema], // List of answers
  timestamp: { type: Date, default: Date.now }, // Timestamp
});

exports.Question = mongoose.model("Question", QuestionSchema);
