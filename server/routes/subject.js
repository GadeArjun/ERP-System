const express = require("express");
const {
  addSubject,
  getSubjectsByTeacherAdminId,
  getSubjectDetailsByTeacherId,
  getSubjectsByTeacherAdminIdAndClass,
} = require("../controllers/subject");

const { userAuth } = require("../auth/userAuth");

const router = express.Router();

router
  .post("/subject", addSubject)
  .get("/subjects", getSubjectsByTeacherAdminId)
  .get("/subject", userAuth, getSubjectDetailsByTeacherId)
  .get("/student-subjects", userAuth, getSubjectsByTeacherAdminIdAndClass);

exports.subjectRouter = router;
