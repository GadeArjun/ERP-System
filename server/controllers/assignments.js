const { Assignment } = require("../models/assignments");
const fs = require("fs");
const path = require("path");

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
  try {
    const { subjectId, std_class, teacherAdminId } = req.body;
    // console.log(
    //   subjectId,
    //   req.file.originalname,
    //   `/uploads/${req.file.filename}`
    // );

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const newAssignment = new Assignment({
      subjectId,
      std_class,
      teacherAdminId,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    // console.log(newAssignment);

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
    console.log(error);
  }
};

// Get Assignments by Subject ID
exports.getAssignmentsBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.query;
    // console.log({ subjectId });

    const assignments = await Assignment.find({ subjectId });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

exports.getAssignmentsByClassAndTeacherAdminId = async (req, res) => {
  try {
    const { std_class, teacherAdminId } = req.query;
    // console.log(std_class, teacherAdminId);

    const assignments = await Assignment.find({
      $and: [{ std_class: std_class }, { teacherAdminId: teacherAdminId }],
    });

    // console.log(assignments);

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

// Delete Assignment by ID
exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.query;
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Delete the file from the server
    const filePath = path.join(__dirname, `../${assignment.fileUrl}`);
    fs.unlinkSync(filePath);

    // Remove the assignment from the database
    await Assignment.findByIdAndDelete(id);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting assignment", error });
  }
};
