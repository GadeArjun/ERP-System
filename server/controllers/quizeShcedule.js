const { Quiz } = require("../models/quiz");
const { QuizSchedule } = require("../models/quizeShcedule");

exports.scheduleQuiz = async (req, res) => {
  try {
    const {
      quizId,
      availabilityTime,
      quizDuration,
      quizStartDate,
      std_class,
      teacherAdminId,
      subjectId,
    } = req.body;

    const today = new Date();
    const startDate = new Date(quizStartDate);

    if (startDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "Quiz start date must be today or a future date.",
      });
    }

    await Quiz.findByIdAndUpdate(quizId, { status: "schedule" }, { new: true });

    // Create a new quiz schedule
    const newSchedule = new QuizSchedule({
      quizId,
      availabilityTime,
      quizDuration,
      quizStartDate,
      std_class,
      teacherAdminId,
      subjectId,
    });

    await newSchedule.save();

    res.status(201).json({
      message: "Quiz scheduled successfully!",
      data: newSchedule,
    });
  } catch (error) {
    console.error("Error scheduling quiz:", error);
    res.status(500).json({
      message: "An error occurred while scheduling the quiz.",
      error: error.message,
    });
  }
};

exports.getScheduleQuizzesByTeacherAdminId = async (req, res) => {
  try {
    const { teacherAdminId } = req.query;
    const scheduledQuizzes = await QuizSchedule.find({
      teacherAdminId: teacherAdminId,
    });

    res.status(200).json(scheduledQuizzes);
  } catch (err) {
    res.status(500).json(err);
  }
};
