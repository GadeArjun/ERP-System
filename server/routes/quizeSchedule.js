const express = require("express");
const {
  scheduleQuiz,
  getScheduleQuizzesByTeacherAdminId,
} = require("../controllers/quizeShcedule");

const router = express.Router();

router
  .post("/quiz-schedule", scheduleQuiz)
  .get("/get-schedule-quiz", getScheduleQuizzesByTeacherAdminId);

exports.quizScheduleRouter = router;
