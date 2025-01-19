const express = require("express");

const { createParent, parentLogin } = require("../controllers/parent");

const router = express.Router();

router.post("/parent", createParent).post("/parent-login", parentLogin);

exports.parentRouter = router;
