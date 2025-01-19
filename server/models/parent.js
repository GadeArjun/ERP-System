const { mongoose, Schema } = require("mongoose");

const parentSchema = new Schema(
  {
    //   parentId: "43trefdtr535tr",
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, require: true, default: "Parent" },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

exports.Parent = mongoose.model("Parent", parentSchema);
