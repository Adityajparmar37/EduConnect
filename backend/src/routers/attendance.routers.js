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
      let newAttendance = false;

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

        if (
          existingAttendance &&
          existingAttendance.subjectId.equals(
            data.SubjectId
          )
        ) {
          // If existing attendance data found for the same subjectId and date, update it
          existingAttendance.attendance =
            data.attendance;
          await existingAttendance.save();
          console.log(
            "Existing attendance data updated:",
            existingAttendance
          );
        } else {
          // If no existing attendance data found or subjectId changed or date is different, save new attendance data
          const newRecord = new Attendance({
            subjectId: data.SubjectId,
            studentId: data.Student,
            attendance: data.attendance,
          });
          await newRecord.save();
          newAttendance = true; // Mark that new attendance has been added
          console.log(
            "New attendance data saved:",
            newRecord
          );
        }
      }

      if (newAttendance) {
        res.json({
          success: true,
          message: "Attendance Marked",
        });
      } else {
        res.json({
          success: true,
          message: "Attendance Updated",
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
