const mongoose = require("mongoose");

// Define the Subject Schema
const subjectSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model(
  "Subject",
  subjectSchema
);

const semesterSchema = mongoose.Schema(
  {
    semesterName: {
      type: Number,
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Semester = mongoose.model(
  "Semester",
  semesterSchema
);

module.exports = { Subject, Semester };
