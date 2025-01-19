const express = require("express");
const multer = require("multer");
const {
  uploadAssignment,
  getAssignmentsBySubjectId,
  deleteAssignment,
  getAssignmentsByClassAndTeacherAdminId,
} = require("../controllers/assignments");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
exports.assignmetsRouter = router
  .post("/assignment", upload.single("file"), uploadAssignment)
  .get("/assignments", getAssignmentsBySubjectId)
  .get("/student-assignments", getAssignmentsByClassAndTeacherAdminId)
  .delete("/assignment", deleteAssignment);
