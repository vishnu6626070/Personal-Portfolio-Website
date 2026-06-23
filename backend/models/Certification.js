const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String },
  link: { type: String },
  image: { type: String }
});

module.exports = mongoose.model("Certification", certificationSchema);
