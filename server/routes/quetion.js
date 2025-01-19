const express = require("express");
const {
  addQuestion,
  getQuestions,
  addAnswer,
} = require("../controllers/quetion");

const router = express.Router();

router
  .post("/add-question", addQuestion)
  .get("/get-questions", getQuestions)
  .post("/add-answer", addAnswer);

exports.quetionRouter = router;
