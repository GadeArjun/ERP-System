const { TeacherAttendance } = require("../models/teacherAttendance");

exports.takeAttendance = async (req, res) => {
  try {
    const { subjectId } = req.body;

    // Find the attendance record for the subject
    let attendance = await TeacherAttendance.findOne({ subjectId });

    if (attendance) {
      // If attendance exists, increment the daysOfAttendance
      attendance.daysOfAttendance += 1;
      await attendance.save(); // Save the updated document
    } else {
      // If no attendance record exists, create a new one
      attendance = new TeacherAttendance({
        subjectId,
        daysOfAttendance: 1,
      });
      await attendance.save(); // Save the new document
    }

    res
      .status(200)
      .json({ message: "Attendance recorded successfully", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAttendanceBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.query;
    // console.log(subjectId);

    // Find the attendance record for the given subject ID
    const attendance = await TeacherAttendance.findOne({ subjectId });
    // console.log({ attendance });

    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
