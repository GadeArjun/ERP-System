const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizScheduleSchema = new Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    availabilityTime: {
      type: String,
      required: true,
    },
    quizDuration: {
      type: String,
      required: true,
    },
    quizStartDate: {
      type: Date,
      required: true,
    },
    std_class: {
      type: String,
      required: true,
    },
    teacherAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeacherAdmin",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.QuizSchedule = mongoose.model("QuizSchedule", quizScheduleSchema);
