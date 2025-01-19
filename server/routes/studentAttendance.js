const express = require("express");
const {
  markAttendance,
  getAttendanceRecords,
} = require("../controllers/studentAttendance");

const router = express.Router();

router
  .post("/add-student-attendance", markAttendance)
  .get("/get-student-attendance", getAttendanceRecords);

exports.studentAttendanceRouter = router;
