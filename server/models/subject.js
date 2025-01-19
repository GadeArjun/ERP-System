const { mongoose, Schema } = require("mongoose");

const subjectSchema = new Schema(
  {
    //   subjectId :"fsdvbnhytrefsdcb43re",
    subjectName: { type: String, required: true, trim: true },
    subjectCode: { type: String, required: true, unique: true, trim: true },
    class: { type: String, required: true, trim: true },
    teacherAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TeacherAdmin",
    },
  },
  { timestamps: true }
);

exports.Subject = mongoose.model("Subject", subjectSchema);
