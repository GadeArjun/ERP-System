const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    teacherAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TeacherAdmin",
    },
    std_class: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.Assignment = mongoose.model("Assignment", AssignmentSchema);
