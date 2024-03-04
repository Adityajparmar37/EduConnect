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

      for (const data of attendanceData) {
        // Check if attendance data for the same subjectId and studentId exists for the current date
        const existingAttendance =
          await Attendance.findOne({
            subjectId: data.SubjectId,
            studentId: data.Student,
            createdAt: {
              $gte: new Date().setHours(
                0,
                0,
                0,
                0
              ),
            }, // Check for data of the same date
          });

        if (existingAttendance) {
          // If existing attendance data found, update it
          existingAttendance.attendance =
            data.attendance;
          await existingAttendance.save();
          console.log(
            "Existing attendance data updated:",
            existingAttendance
          );
        } else {
          // If no existing attendance data found, save new attendance data
          const newAttendance = new Attendance({
            subjectId: data.SubjectId,
            studentId: data.Student,
            attendance: data.attendance,
          });
          await newAttendance.save();
          console.log(
            "New attendance data saved:",
            newAttendance
          );
        }
      }

      res.send("done");
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;