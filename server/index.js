const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const { mongooseConnection } = require("./database/db");
const { collegeAdminRouter } = require("./routes/collegeAdmin");
const { teacherAdminRouter } = require("./routes/teacherAdmin");
const { teacherRouter } = require("./routes/teacher");
const { studentRouter } = require("./routes/student");
const { parentRouter } = require("./routes/parent");
const { subjectRouter } = require("./routes/subject");
const { quizRouter } = require("./routes/quiz");
const { assignmetsRouter } = require("./routes/assignments");
const { studentQuizRouter } = require("./routes/studentQuiz");
const { quizScheduleRouter } = require("./routes/quizeSchedule");
const { studentAttendanceRouter } = require("./routes/studentAttendance");
const { teacherAttendanceRouter } = require("./routes/teacherAttendance");
const { quetionRouter } = require("./routes/quetion");
const { chatWithAIRouter } = require("./routes/chatWithAI");

const server = express();

server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "public", "build")));

server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use(collegeAdminRouter);
server.use(teacherAdminRouter);
server.use(subjectRouter);
server.use(teacherRouter);
server.use(studentRouter);
server.use(parentRouter);
server.use(quizRouter);
server.use(assignmetsRouter);
server.use(studentQuizRouter);
server.use(quizScheduleRouter);
server.use(studentAttendanceRouter);
server.use(teacherAttendanceRouter);
server.use(quetionRouter);
server.use(chatWithAIRouter);

server.use("*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "build", "index.html"));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

mongooseConnection();

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err) => {
  if (err) {
    console.log({ err });
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
