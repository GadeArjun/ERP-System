const { mongoose, Schema } = require("mongoose");

const teacherAdminSchema = new Schema(
  {
    // "teacherAdminId": "43recjh2ucrildfh34",
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "CollegeAdmin",
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    branchCode: { type: String, trim: true },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "TeacherAdmin",
    },
  },
  {
    timestamps: true,
  }
);

exports.TeacherAdmin = mongoose.model("TeacherAdmin", teacherAdminSchema);
