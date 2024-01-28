const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnect = require("./config/database.config");
const adminRoutes = require("./src/routers/admin.routers.js");
const studentRoutes = require("./src/routers/student.routers.js");
const teacherRoutes = require("./src/routers/teacher.routers.js");
const subjectRoutes = require("./src/routers/subject.routers.js");

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

//routing api handling
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/subject", subjectRoutes);

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

app.listen(PORT, () => {
  console.log(`serving on ${PORT}`);
});
