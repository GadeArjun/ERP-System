const express = require("express");
const {
  createCollegeAdmin,
  collegeAdminLogin,
  findCollegeByCollegeId,
} = require("../controllers/collegeAdmin");
const { userAuth } = require("../auth/userAuth");

const router = express.Router();

router
  .post("/college-admin", createCollegeAdmin)
  .post("/college-admin-login", collegeAdminLogin)
  .get("/get-college", userAuth,findCollegeByCollegeId);

exports.collegeAdminRouter = router;
