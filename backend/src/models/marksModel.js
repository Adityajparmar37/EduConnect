const mongoose = require("mongoose");

const marksSchema = mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    marks: [
      {
        type: Number,
        default: 0,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model(
  "Marks",
  marksSchema
);

module.exports = Marks;
