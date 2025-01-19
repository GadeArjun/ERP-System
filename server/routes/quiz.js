const express = require("express");
const { addQuiz, getQuizeBySubjectId, getCompletedQuizzeByTeacherAdminId } = require("../controllers/quiz");

const router = express.Router();

router
  .post("/add-quiz", addQuiz)
  .get("/get-quizzes", getQuizeBySubjectId)
  .get("/student-quizzes", getCompletedQuizzeByTeacherAdminId);

exports.quizRouter = router;
