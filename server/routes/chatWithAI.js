const express = require("express");
const { chatWithAI } = require("../controllers/chatWithAI");

const router = express.Router();

router.post("/chat-with-ai", chatWithAI);

exports.chatWithAIRouter = router;
