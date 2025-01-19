const express = require("express");
const {
  takeAttendance,
  getAttendanceBySubjectId,
} = require("../controllers/teacherAttendance");

const router = express.Router();

router
  .post("/attendance", takeAttendance)
  .get("/attendance", getAttendanceBySubjectId);

exports.teacherAttendanceRouter = router;
