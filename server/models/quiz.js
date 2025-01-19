const mongoose = require("mongoose");

// Define the main Quiz schema with embedded questions
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  teacherAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherAdmin",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String], // Array of options (e.g., ["Option A", "Option B", "Option C", "Option D"])
        validate: {
          validator: function (options) {
            return options.length === 4; // Ensure there are exactly 4 options
          },
          message: "There must be exactly 4 options.",
        },
      },
      correctAnswer: {
        type: String,
        required: true, // The correct answer must match one of the options
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Quiz model
exports.Quiz = mongoose.model("Quiz", QuizSchema);
