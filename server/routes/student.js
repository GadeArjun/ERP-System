const express = require("express");
const {
  createStudent,
  studentLogin,
  getAllStundetsByTeacherAdminId,
  getAllStundetsByTeacherAdminIdAndClass,
  getStudentData,
  getStudentbyId,
} = require("../controllers/student");

const { userAuth } = require("../auth/userAuth");

const router = express.Router();

router
  .post("/student", createStudent)
  .post("/student-login", studentLogin)
  .get("/students", getAllStundetsByTeacherAdminId)
  .get("/students-details", getAllStundetsByTeacherAdminIdAndClass)
  .get("/student-data", userAuth, getStudentData)
  .get("student", getStudentbyId);

exports.studentRouter = router;
