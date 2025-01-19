const express = require("express");
const { Server } = require("socket.io");
const http = require("http");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Socket is running...");
});

io.on("connection", (socket) => {
  console.log("Connected with socket ID =", socket.id);

  // Notify all users about new questions or answers
  socket.on("newQuestion", (question) => {
    io.emit("newQuestion", question); // Broadcast the new question
  });

  socket.on("newAnswer", (data) => {
    io.emit("newAnswer", data); // Broadcast the new answer
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start Server
server.listen(8081, () => {
  console.log("Socket is running on port 8081...");
});
