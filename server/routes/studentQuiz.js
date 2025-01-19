const express = require("express");
const {
  getStudentAndQuizDetailsByStundentId,
  addQuizResult,
} = require("../controllers/studentQuiz");

const router = express.Router();

router
  .get("/student-quiz-data", getStudentAndQuizDetailsByStundentId)
  .post("/add-completed-quiz", addQuizResult);

exports.studentQuizRouter = router;
