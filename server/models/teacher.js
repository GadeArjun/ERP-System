const { mongoose, Schema } = require("mongoose");

const teacherSchema = new Schema(
  {
    //   teacherId: "4524r3ewfdtfrd",
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    branchCode: { type: String, trim: true },
    subjects: { type: String, required: true, trim: true },
    subjectCode: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "Teacher",
    },
    collegeAdminId: {
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
      ref: "Subject",
    },
  },
  {
    timestamps: true,
  }
);

exports.Teacher = mongoose.model("Teacher", teacherSchema);
