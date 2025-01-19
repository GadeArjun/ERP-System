const { Parent } = require("../models/parent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("./sendMail");

// Create Parent with bcrypt
exports.createParent = async (req, res) => {
  try {
    const parentData = req.body;
    // console.log({ parentData });

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(parentData.password, 10); // 10 is the salt rounds
    parentData.password = hashedPassword;

    const parent = new Parent(parentData);
    await parent.save();

    res.status(201).json({ message: "Parent created successfully", parent });

    
    const message = `
    Your login creadintails for ERP System:

    Email : ${parent.email}
    Password : ${parent.password}
    `
    await sendMail(parent.email ,message);




  } catch (err) {
    res.status(400).json({
      error: "Parent already exists or invalid data",
      details: err.message,
    });
  }
};

// Parent Login with bcrypt and JWT
exports.parentLogin = async (req, res) => {
  try {
    const parentData = req.body;

    // Find the parent by email
    const parent = await Parent.findOne({ email: parentData.email });

    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    // Compare the hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(
      parentData.password,
      parent.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: parent._id,
        email: parent.email,
        role: "Parent",
        studentId: parent.studentId,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ message: "Login successful", token, parent });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};
