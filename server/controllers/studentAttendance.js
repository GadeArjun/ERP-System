const { StudentAttendance } = require("../models/studentAttendance");

exports.markAttendance = async (req, res) => {
  const { studentId, subjectId } = req.body;

  // Validate inputs
  if (!studentId || !subjectId) {
    return res
      .status(400)
      .json({ error: "Student ID and Subject ID are required." });
  }

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Find the student document
    let student = await StudentAttendance.findOne({ studentId });

    // If student does not exist, create a new student
    if (!student) {
      student = new StudentAttendance({
        studentId,
        attendance: [],
      });
    }

    // Find or create the subject attendance record
    let subjectAttendance = student.attendance.find(
      (subject) => subject.subjectId.toString() === subjectId.toString()
    );

    if (!subjectAttendance) {
      subjectAttendance = {
        subjectId,
        records: [],
      };
      student.attendance.push(subjectAttendance);
    }

    // Check if today's attendance is already marked
    const todayRecord = subjectAttendance.records.find(
      (record) => record.date === today
    );

    if (todayRecord) {
      return res
        .status(400)
        .json({ error: "Attendance already marked for today." });
    }

    // Add a new record for today
    subjectAttendance.records.push({ date: today, attended: true });

    // Save the updated student document
    await student.save();

    res.status(201).json({ message: "Attendance marked successfully." });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getAttendanceRecords = async (req, res) => {
  const { studentId, subjectId } = req.query;

  // Validate inputs
  if (!studentId || !subjectId) {
    return res
      .status(400)
      .json({ error: "Student ID and Subject ID are required." });
  }

  try {
    // Find the student attendance document by studentId
    const student = await StudentAttendance.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    const subjectAttendance = student.attendance.find(
      (subject) => subject.subjectId.toString() === subjectId.toString()
    );

    if (!subjectAttendance) {
      return res.status(404).json({
        error: "No attendance records found for the specified subject.",
      });
    }

    // Return the attendance records for the subject
    res.status(200).json({
      studentId: student.studentId,
      subjectId: subjectAttendance.subjectId,
      attendanceRecords: subjectAttendance.records,
    });
  } catch (error) {
    console.error("Error retrieving attendance records:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
