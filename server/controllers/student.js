const { Student } = require("../models/student");
const { Subject } = require("../models/subject");
const { StudentAttendance } = require("../models/studentAttendance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("./sendMail");

// Create Student with bcrypt
exports.createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // console.log({ studentData });

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(studentData.password, 10); // 10 is the salt rounds
    studentData.password = hashedPassword;

    const student = new Student(studentData);
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });

    const message = `
    Your login creadintails for ERP System:

    Email : ${student.email}
    Password : ${student.password}
    `
    await sendMail(student.email ,message);

  } catch (err) {
    res.status(400).json({
      error: "Student already exists or invalid data",
      details: err.message,
    });
    console.log(err);
  }
};

// Student Login with bcrypt and JWT
exports.studentLogin = async (req, res) => {
  try {
    const studentData = req.body;

    // Find the student by email
    const student = await Student.findOne({ email: studentData.email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Compare the hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(
      studentData.password,
      student.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // console.log(student);

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        teacherAdminId: student.teacherAdminId,
        std_class: student.class,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ message: "Login successful", student, token });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

exports.getAllStundetsByTeacherAdminId = async (req, res) => {
  try {
    const teacherAdminId = req.query.userId;
    const students = await Student.find({ teacherAdminId: teacherAdminId });

    res.status(200).json(students);
    //  console.log(req.query, req.query.userId);
  } catch (err) {
    res.status(500).json("Error : Internal server error");
  }
};

exports.getAllStundetsByTeacherAdminIdAndClass = async (req, res) => {
  try {
    const teacherAdminId = req.query.teacherAdminId;
    const std_class = req.query.class;
    // console.log(req.query);

    const students = await Student.find({
      $and: [{ teacherAdminId: teacherAdminId }, { class: std_class }],
    });

    // console.log(students);

    res.status(200).json(students);
    //  console.log(req.query, req.query.userId);
  } catch (err) {
    res.status(500).json("Error : Internal server error");
  }
};

exports.getStudentData = async (req, res) => {
  try {
    const { studentId } = req.user;

    const student = await Student.find({ _id: studentId });

    const subjects = await Subject.find({
      $and: [
        { class: student[0].class },
        { teacherAdminId: student[0].teacherAdminId },
      ],
    });

    
    const attendance = await StudentAttendance.findOne({ studentId });

    // console.log({ subjects });
    res.status(200).json({ student, subjects, attendance });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStudentbyId = async (req, res) => {
  try {
    const { id } = req.query;
    const student = await Student.findOne({ _id: id });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json("Intenal server error");
  }
};
