const { mongoose, Schema } = require("mongoose");

const teacherAttendanceSchema = new Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },

    daysOfAttendance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.TeacherAttendance = mongoose.model(
  "TeacherAttendance",
  teacherAttendanceSchema
);
