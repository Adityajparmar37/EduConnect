const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Attendance = require("../models/attendanceModel.js");
dotenv.config();

router.use(authMid);

router.post(
  "/markAttendance",
  handler(async (req, res, next) => {
    try {
      const attendanceData = req.body;
      let newAttendance, existingAttendance;

      for (const data of attendanceData) {
        // Check if attendance data for the same subjectId and studentId exists for the current date
        existingAttendance =
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
          newAttendance = new Attendance({
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

      if (newAttendance) {
        res.json({
          success: true,
          message: "Attendance Marked",
        });
      } else if (existingAttendance) {
        res.json({
          success: true,
          message: "Attendance Updated",
        });
      } else {
        res.json({
          success: false,
          message: "Please try again",
        });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);

router.get(
  "/viewattendance/:stuId",
  handler(async (req, res, next) => {
    try {
      const stuId = req.params.stuId;
      console.log(stuId);

      const Student_attendance =
        await Attendance.find({
          studentId: stuId,
        });
      res.send(Student_attendance);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;
