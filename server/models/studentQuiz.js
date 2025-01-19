const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentQuizSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    quizzes: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports.StudentQuiz = mongoose.model("StudentQuiz", studentQuizSchema);
