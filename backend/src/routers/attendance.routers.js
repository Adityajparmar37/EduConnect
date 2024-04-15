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

      for (const data of attendanceData) {
        // Extract attendance data from the request body
        const {
          SubjectId,
          Student,
          attendance,
          date,
        } = data;

        // Check if attendance data for the same subjectId, studentId, and date exists
        const existingAttendance =
          await Attendance.findOne({
            subjectId: SubjectId,
            studentId: Student,
            date: date,
          });

        if (
          existingAttendance &&
          existingAttendance.subjectId.equals(
            SubjectId
          )
        ) {
          // If existing attendance data found, update it
          existingAttendance.attendance =
            attendance;
          await existingAttendance.save();
          console.log(
            "Existing attendance data updated:",
            existingAttendance
          );
        } else {
          // If no existing attendance data found, save new attendance data
          const newRecord = new Attendance({
            subjectId: SubjectId,
            studentId: Student,
            attendance: attendance,
            date: date, // Use the date from the request body
          });
          await newRecord.save();
          console.log(
            "New attendance data saved:",
            newRecord
          );
        }
      }

      res.json({
        success: true,
        message: "Attendance marked",
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);


router.get(
  "/viewattendance",
  handler(async (req, res, next) => {
    try {
      const stuId = req.user.id;
      console.log(stuId);

      const Student_attendance =
        await Attendance.find({
          studentId: stuId,
        }).populate(
          "subjectId",
          "subjectName subjectNumber"
        );

      res.send(Student_attendance);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

// router.get(
//   "/downloadAttendanceReport",
//   handler(async (req, res, next) => {
//     try {
//       const teacherId = req.user.id;
//       const { subjectId } = req.query;

//       console.log("teacherId => ", teacherId);
//       console.log("subjectId => ", subjectId);

//       // Find all attendance records for the subject
//       const subjectAttendance =
//         await Attendance.find({
//           subjectId,
//         }).populate(
//           "studentId",
//           "name attendance"
//         );

//       console.log(subjectAttendance);

//       if (subjectAttendance.length === 0) {
//         return res.json({
//           success: true,
//           message:
//             "No attendance records found for this subject.",
//         });
//       }

//       // Filter students with attendance below 60%
//       const studentsBelowThreshold =
//         subjectAttendance.filter(
//           (attendance) =>
//             (attendance.attendance /
//               attendance.subjectId.totalClasses) *
//               100 <
//             60
//         );

//       console.log(studentsBelowThreshold);

//       if (studentsBelowThreshold.length === 0) {
//         return res.json({
//           success: true,
//           message:
//             "No students found with attendance below 60%.",
//         });
//       }

//       // Generate and download report
//       const reportFilename = `attendance_report_${subjectId}`;
//       const reportPath = path.join(
//         __dirname,
//         "../reports",
//         `${reportFilename}.pdf`
//       );
//       generatePDFReport(
//         studentsBelowThreshold,
//         reportPath,
//         subjectId
//       );

//       res.download(
//         reportPath,
//         `${reportFilename}.pdf`,
//         (err) => {
//           if (err) {
//             console.error(
//               "Error downloading report:",
//               err
//             );
//             return next(err);
//           }
//           // Delete the report file after download
//           fs.unlinkSync(reportPath);
//         }
//       );
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   })
// );

// function generatePDFReport(
//   students,
//   filePath,
//   subjectId
// ) {
//   const doc = new pdf();
//   doc.pipe(fs.createWriteStream(filePath));

//   doc
//     .font("Helvetica-Bold")
//     .fontSize(16)
//     .text(
//       `Attendance Report - Subject: ${subjectId}`,
//       { align: "center" }
//     );

//   students.forEach((attendance) => {
//     doc
//       .font("Helvetica")
//       .fontSize(12)
//       .text(
//         `Student Name: ${attendance.studentId.name}`,
//         { continued: true }
//       );
//     doc.text(
//       `Attendance: ${attendance.attendance}`,
//       { continued: true }
//     );
//     doc.text(
//       `Total Classes: ${attendance.subjectId.totalClasses}`,
//       { continued: true }
//     );
//     doc.text(
//       `Attendance Percentage: ${
//         (attendance.attendance /
//           attendance.subjectId.totalClasses) *
//         100
//       }%`,
//       { continued: true }
//     );
//     doc.moveDown();
//   });

//   doc.end();
// }

module.exports = router;
