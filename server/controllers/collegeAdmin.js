const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CollegeAdmin } = require("../models/collegeAdmin");

exports.createCollegeAdmin = async (req, res) => {
  try {
    const collegeAdminData = req.body;
    // console.log(collegeAdminData);

    const hashedPassword = await bcrypt.hash(
      collegeAdminData.adminPassword,
      10
    );
    // await CollegeAdmin.deleteMany({});

    collegeAdminData.adminPassword = hashedPassword;

    const collegeAdmin = new CollegeAdmin(collegeAdminData);

    await collegeAdmin.save();

    // console.log({ collegeAdmin });
    res.status(201).json(collegeAdmin);
  } catch (err) {
    res.status(400).json("College already exists.");
    console.log({ err });
  }
};

exports.collegeAdminLogin = async (req, res) => {
  try {
    const collegeAdminData = req.body;

    // console.log(await CollegeAdmin.find({}));

    const collegeAdmin = await CollegeAdmin.findOne({
      adminEmail: collegeAdminData.email,
    });

    // console.log(collegeAdmin);

    if (!collegeAdmin) {
      return res.status(404).json("College admin not found");
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      collegeAdminData.password,
      collegeAdmin.adminPassword
    );

    if (isPasswordValid) {
      // Generate JWT Token if password is correct
      const token = jwt.sign(
        { collegeId: collegeAdmin._id, email: collegeAdmin.adminEmail },
        process.env.JWT_SECRET_KEY // This should be stored in environment variables
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        collegeAdmin: collegeAdmin,
      });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findCollegeByCollegeId = async (req, res) => {
  try {
    const { collegeId } = req.user;
    // console.log({ collegeId });

    const collegeAdminData = await CollegeAdmin.findOne({
      _id: collegeId,
    });

    // console.log({ collegeAdminData });

    if (collegeAdminData) {
      res.status(200).json(collegeAdminData);
    } else {
      res.status(404).json("College not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
