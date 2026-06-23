const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  gpa: { type: String },
  details: { type: String }
});

module.exports = mongoose.model("Education", educationSchema);
