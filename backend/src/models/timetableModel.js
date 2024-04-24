const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      days: [{ type: String, required: true }], // Change to array of strings
      startTime: {
        hour: { type: String, required: true },
        minute: { type: String, required: true },
        period: { type: String, required: true },
      },
      endTime: {
        hour: { type: String, required: true },
        minute: { type: String, required: true },
        period: { type: String, required: true },
      },
      batch: { type: String },
      type: { type: String, required: true },
      classroom: { type: String, required: true },
    },
  ],
});

const Timetable = mongoose.model(
  "Timetable",
  timetableSchema
);

module.exports = Timetable;
