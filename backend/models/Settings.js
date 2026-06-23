const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  name: { type: String, default: "ANNAPUREDDY VISHNUVARDHAN REDDY" },
  title: { type: String, default: "B.Tech Data Science Student" },
  bio: { type: String, default: "I build machine learning, data analysis, and web development projects." },
  about: { type: String, default: "Currently pursuing B.Tech in Data Science at Aditya University. Passionate about machine learning, statistical modeling, and full-stack web development." },
  profileImage: { type: String, default: "images/profiler.jfif" },
  resumeUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  emailUrl: { type: String, default: "" },
  visitorCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Settings", settingsSchema);
