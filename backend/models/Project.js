const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  github: { type: String },
  demo: { type: String },
  image: { type: String },
  category: { type: String, default: "Machine Learning" }, // e.g. Machine Learning, Data Analytics, Web Development
  tags: { type: String } // e.g. "Python, Pandas, Scikit-learn"
});

module.exports = mongoose.model("Project", projectSchema);