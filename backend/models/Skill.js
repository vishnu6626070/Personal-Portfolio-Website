const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, default: "Data Science" } // e.g. Programming, Machine Learning, Web, Tools
});

module.exports = mongoose.model("Skill", skillSchema);