const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TeacherAdmin } = require("../models/teacherAdmin");
const { CollegeAdmin } = require("../models/collegeAdmin");
const { Teacher } = require("../models/teacher");
const { sendMail } = require("./sendMail");

exports.createTeacherAdmin = async (req, res) => {
  try {
    const teacherAdminData = req.body;

    const hashedPassword = await bcrypt.hash(teacherAdminData.password, 10);
    teacherAdminData.password = hashedPassword;

    const teacherAdmin = new TeacherAdmin(teacherAdminData);
    await teacherAdmin.save();

    res.status(201).json({
      message: "Teacher Admin created successfully",
      teacherAdmin: teacherAdmin,
    });

    const message = `
    Your login creadintails for ERP System:

    Email : ${teacherAdminData.email}
    Password : ${teacherAdmin.password}
    `
    await sendMail(teacherAdminData.email ,message )


  } catch (err) {
    console.log(err);

    res
      .status(400)
      .json({ message: "Teacher Admin already exists.", error: err });
  }
};

exports.teacherAdminLogin = async (req, res) => {
  try {
    const teacherAdminData = req.body;

    const teacherAdmin = await TeacherAdmin.findOne({
      email: teacherAdminData.email,
    });

    if (!teacherAdmin) {
      return res.status(404).json("Teacher Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(
      teacherAdminData.password,
      teacherAdmin.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          teacherAdminId: teacherAdmin._id,
          email: teacherAdmin.email,
          collegeId: teacherAdmin.collegeId,
        },

        process.env.JWT_SECRET_KEY
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        teacherAdmin: teacherAdmin,
      });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllAdminTeachers = async (req, res) => {
  try {
    const { collegeId } = req.user;
    // console.log(req.user, collegeId);

    const collegeAdminData = await CollegeAdmin.findOne({ _id: collegeId });
    const teacherAdminData = await TeacherAdmin.find({ collegeId: collegeId });

    res.status(200).json({
      message: "Teachers fetched successfully",
      teacherAdminData: teacherAdminData,
      collegeAdminData: collegeAdminData,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err });
  }
};

exports.findAdminTeacherById = async (req, res) => {
  try {
    const { teacherAdminId } = req.user;
    // console.log(req.user, teacherAdminId);
    const teacherAdminData = await TeacherAdmin.findOne({
      _id: teacherAdminId,
    });

    if (teacherAdminData) {
      res.status(200).json(teacherAdminData);
    } else {
      res.status(404).json("Not found");
    }
  } catch (err) {
    res.status(500).json("Serever Error");
  }
};
