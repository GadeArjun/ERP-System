const { Quiz } = require("../models/quiz");

// Controller to add a new quiz
exports.addQuiz = async (req, res) => {
  try {
    // Extract quiz data from the request body
    const { title, subjectId, questions, teacherAdminId } = req.body;

    // console.log(req.body);

    // Validate that all fields are provided
    if (
      !title ||
      !subjectId ||
      !questions ||
      !teacherAdminId ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message:
          "Title, subjectId, teacher admin id,and at least one question are required.",
      });
    }

    // Validate each question's structure
    for (const question of questions) {
      if (
        !question.question ||
        !question.options ||
        question.options.length !== 4 ||
        !question.correctAnswer
      ) {
        return res.status(400).json({
          message:
            "Each question must have a question text, exactly 4 options, and a correct answer.",
        });
      }

      // Ensure correctAnswer is one of the provided options
      if (!question.options.includes(question.correctAnswer)) {
        return res.status(400).json({
          message: `The correct answer for question "${question.question}" must match one of the provided options.`,
        });
      }
    }

    // Create a new quiz
    const quiz = new Quiz({
      title,
      subjectId,
      questions,
      teacherAdminId,
    });

    // Save the quiz to the database
    await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully.",
      quiz,
    });
  } catch (error) {
    console.error("Error adding quiz:", error);
    res.status(500).json({ message: "Failed to create quiz.", error });
  }
};

exports.getQuizeBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.query;
    const quizzes = await Quiz.find({ subjectId: subjectId }).sort({
      createdAt: -1,
    });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: "Error: server error", err: err });
  }
};

exports.getCompletedQuizzeByTeacherAdminId = async (req, res) => {
  try {
    const { teacherAdminId } = req.query;
    const quizzes = await Quiz.find({
      teacherAdminId: teacherAdminId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(quizzes);
    // console.log(quizzes.length);
    
  } catch (err) {
    res.status(500).json({ msg: "Error: server error", err: err });
  }
};
