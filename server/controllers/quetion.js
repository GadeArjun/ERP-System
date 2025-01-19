const { Question } = require("../models/quetions");

// Add a question
exports.addQuestion = async (req, res) => {
  try {
    // console.log("add quetion");

    const { question, userId } = req.body;
    const newQuestion = new Question({ question, userId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    // console.log("get quetions");
    
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// Add an answer
exports.addAnswer = async (req, res) => {
  try {
    // console.log("add answer");
    
    const { questionId, userId, answer } = req.body;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.answers.push({ userId, answer });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to add answer" });
  }
};
