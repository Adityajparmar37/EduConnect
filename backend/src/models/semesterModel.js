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

// Define the Semester Schema with an array of subjects
const semesterSchema = mongoose.Schema(
  {
    semesterName: {
      type: Number,
      required: true,
    },
    subjects: [subjectSchema],
  },
  {
    timestamps: true,
  }
);

// Create a model based on the semester schema
const Semester = mongoose.model(
  "Semester",
  semesterSchema
);

module.exports = Semester;
