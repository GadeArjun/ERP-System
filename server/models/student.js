const { mongoose, Schema } = require("mongoose");

const studentSchema = new Schema(
  {
    //   studentId: "4regfdvctfdvc645tr",
    name: { type: String, required: true, trim: true },
    class: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, require: true, default: "Student" },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "CollegeAdmin",
    },
    teacherAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "TeacherAdmin",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

exports.Student = mongoose.model("Student", studentSchema);
