const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Marks = require("../models/marksModel.js"); // Import the Marks model
dotenv.config();

router.use(authMid);

router.post(
  "/enterMarks",
  handler(async (req, res, next) => {
    try {
      const marksData = req.body;
      let newMarks;
      console.log(marksData);

      // Iterate over the marksData array and save each set of marks as a document in the database
      for (const marks of marksData) {
        const {
          subject,
          student,
          marks: marksArray,
        } = marks;

        // Create a new Marks document
        newMarks = new Marks({
          SubjectId: subject,
          StudentId: student,
          Marks: marksArray, // Assuming Math is the field in your Marks schema
        });

        await newMarks.save();
      }

      if (newMarks)
        res.send({
          success: true,
          message:
            "Marks data uploaded successfully",
        });
      else {
        res.send({
          success: false,
          message: "Please Try again",
        });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);

module.exports = router;
