const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Attendance = require("../models/attendanceModel.js");
dotenv.config();

router.use(authMid);

router.get(
  "/markAttendance",
  handler(async (req, res, next) => {
    try {
      const { attendanceData } = req.query;

      attendanceData.forEach(async (data) => {
        const newAttendance = new Attendance({
          subjectId: data.SubjectId,
          studentId: data.Student,
          attendance: data.attendance,
        });

        await newAttendance.save();
        console.log(
          "NEW ATTENDACE",
          newAttendance
        );
      });

      res.send("done");
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
