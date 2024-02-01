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
        semesterName: semesterName,
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

router.get(
  "/manageSubject/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const subjectData = await Subject.findById(
        id
      );

      if (!subjectData) {
        next(
          errorHandler(404, "No Subject found !")
        );
      }

      if (subjectData) {
        res.status(200).json(subjectData);
      }
    } catch (error) {
      console.log("subject ==> ", data);
      next(error);
    }
  })
);

router.put(
  "/update/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateSubject = req.body;

      console.log(req.body.semesterName);

      console.log(id, " ", updateSubject);
      const updatedSubjectData =
        await Subject.findByIdAndUpdate(
          id,
          updateSubject,
          { new: true }
        );

      if (!updatedSubjectData) {
        next(
          errorHandler(404, "No Subject found !")
        );
      }

      if (updatedSubjectData) {
        res.json({
          success: true,
          message: "Subject updated successfully",
        });
      } else {
        next(
          errorHandler(400, "Please try again")
        );
      }
    } catch (error) {
      console.log("subject ==> ", error);
      next(error);
    }
  })
);

router.delete(
  "/delete/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;

      // Delete subject from the Subject database
      const deletedSubject =
        await Subject.findByIdAndDelete(id);
      if (!deletedSubject) {
        return res
          .status(404)
          .json({ error: "Subject not found" });
      }

      // Remove the subject reference from the Semesters
      const sem = await Semester.updateMany(
        { subjects: id },
        { $pull: { subjects: id } }
      );

      console.log(sem);

      res.status(200).json({
        success: true,
        message: "Subject deleted successfully",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
);

module.exports = router;
