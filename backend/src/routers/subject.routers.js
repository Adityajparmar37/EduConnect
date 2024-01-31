const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Semester = require("../models/semesterModel.js");
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
        next(
          errorHandler(
            404,
            "Please fill all details"
          )
        );
      }

      let semester = await Semester.findOne({
        semesterName: semesterName,
      });

      if (!semester) {
        semester = new Semester({
          semesterName: semesterName,
          subjects: [
            {
              subjectName: subjectName,
              subjectNumber: subjectNumber,
            },
          ],
        });
      } else {
        // joh semester agar phela thi hoi toh
        semester.subjects.push({
          subjectName: subjectName,
          subjectNumber: subjectNumber,
        });
      }

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
      const allSubject = await Semester.find({});

      if (allSubject && allSubject.length > 0) {
        res.status(200).send(allSubject);
      } else {
        next(
          errorHandler(404, "No subject found")
        );
      }
    } catch (error) {
      console.log(
        "Getting all subject error",
        error
      );
      next(error);
    }
  })
);

module.exports = router;
