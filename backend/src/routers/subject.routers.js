const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const {
  Subject,
  Semester,
} = require("../models/semesterModel.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
dotenv.config();

//authorization
router.use(authMid);

router.post(
  "/addSubject",
  handler(async (req, res, next) => {
    try {
      const {
        subjectName,
        subjectNumber,
        semesterName,
      } = req.body;

      if (
        !subjectName ||
        !subjectNumber ||
        !semesterName
      ) {
        return next(
          errorHandler(
            400,
            "Please fill all details"
          )
        );
      }

      const subject = new Subject({
        subjectName: subjectName,
        subjectNumber: subjectNumber,
      });

      const savedSubject = await subject.save();

      let semester = await Semester.findOne({
        semesterName: semesterName,
      });

      if (!semester) {
        semester = new Semester({
          semesterName: semesterName,
          subjects: [savedSubject._id],
        });
      } else {
        semester.subjects.push(savedSubject._id);
      }

      // Save the semester
      await semester.save();

      res.status(201).json({
        success: true,
        message:
          "Subject added to semester successfully",
      });
    } catch (error) {
      console.log(
        "Error in subject adding or creating ",
        error
      );
      next(error);
    }
  })
);

router.get(
  "/getAllSubject",
  handler(async (req, res, next) => {
    try {
      const allSubjects = await Semester.find(
        {}
      ).populate("subjects");

      if (allSubjects && allSubjects.length > 0) {
        res.status(200).json(allSubjects);
      } else {
        next(
          errorHandler(404, "No subjects found")
        );
      }
    } catch (error) {
      console.log(
        "Getting all subjects error",
        error
      );
      next(error);
    }
  })
);
router.delete(
  "/delete/:subid",
  handler(async (req, res, next) => {
    try {
      const { subid } = req.params;

      // Delete subject from the Subject database
      const deletedSubject =
        await Subject.findByIdAndDelete(subid);
      if (!deletedSubject) {
        return res
          .status(404)
          .json({ error: "Subject not found" });
      }

      // Remove the subject reference from the Semesters
      const sem = await Semester.updateMany(
        { subjects: subid },
        { $pull: { subjects: subid } }
      );

      console.log(sem);

      res.status(200).json({
        message: "Subject deleted successfully",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
);

module.exports = router;
