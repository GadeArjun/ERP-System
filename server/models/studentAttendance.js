const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  attendance: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subject",
      },
      records: [
        {
          date: { type: String, required: true }, // Date in YYYY-MM-DD format
          attended: { type: Boolean, default: false }, // Attendance status for the date
        },
      ],
    },
  ],
});

exports.StudentAttendance = mongoose.model(
  "StudentAttendance",
  studentAttendanceSchema
);
