const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  batchName: { type: String, required: true },
  type: { type: String, required: true },
  classroom: { type: String, required: true },
});

const Timetable = mongoose.model(
  "Timetable",
  timetableSchema
);

module.exports = Timetable;
