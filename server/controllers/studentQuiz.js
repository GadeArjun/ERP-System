const { StudentQuiz } = require("../models/studentQuiz");

// Function to add or update quiz result
exports.addQuizResult = async (req, res) => {
  try {
    const { studentId, quizId, score } = req.body;
    // console.log(req.body);
    // return res.json(req.body);
    await StudentQuiz.findOneAndUpdate(
      { studentId },
      {
        $push: {
          quizzes: {
            quizId,
            score,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(201).json("Quiz result added successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding quiz result:", err: err });
  }
};

exports.getStudentAndQuizDetailsByStundentId = async (req, res) => {
  try {
    const { studentId } = req.query;

    // console.log(req.query, studentId);

    const studentQuizData = await StudentQuiz.findOne({ studentId: studentId });

    // console.log({ studentQuizData });

    res.status(200).json(studentQuizData);
  } catch (err) {
    res.status(500).json({ err: err, msg: "Error : Internal server error." });
  }
};
