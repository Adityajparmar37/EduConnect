const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const dbconnect = require("./config/database.config");
const adminRoutes = require("./src/routers/admin.routers.js");
const studentRoutes = require("./src/routers/student.routers.js");
const teacherRoutes = require("./src/routers/teacher.routers.js");
const subjectRoutes = require("./src/routers/subject.routers.js");
const profileRoutes = require("./src/routers/profile.routers.js");
const attendanceRoutes = require("./src/routers/attendance.routers.js");
const marksRoutes = require("./src/routers/marks.routers");
const discussionForumRoutes = require("./src/routers/discussionForum.routers");
const socketConfig = require("./src/socket/socket.js");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT;
dbconnect();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5175"],
  })
);

// log http
app.use(morgan("dev"));

//routing api handling
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use(
  "/api/discussionForum",
  discussionForumRoutes
);

// Socket setup
const server = http.createServer(app);
socketConfig(server);

// Internal Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

server.listen(PORT, () => {
  console.log(`serving on ${PORT}`);
});
