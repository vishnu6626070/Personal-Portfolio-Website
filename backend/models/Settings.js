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
  visitorCount: { type: Number, default: 0 },
  // Bento Grid dynamic fields
  cgpa: { type: String, default: "9.1" },
  projectsCount: { type: Number, default: 12 },
  certsCount: { type: Number, default: 15 },
  problemsSolved: { type: Number, default: 500 },
  strengths: { type: String, default: "Machine Learning, Deep Learning, Statistical Analysis, Data Engineering" },
  objective: { type: String, default: "To leverage data-driven analytics and statistical models to deliver scalable business solutions..." },
  // Coding profiles URLs
  leetcodeUrl: { type: String, default: "" },
  geeksforgeeksUrl: { type: String, default: "" },
  codechefUrl: { type: String, default: "" },
  hackerrankUrl: { type: String, default: "" },
  // Coding profiles solved counts
  leetcodeSolved: { type: Number, default: 0 },
  geeksforgeeksSolved: { type: Number, default: 0 },
  codechefSolved: { type: Number, default: 0 },
  hackerrankSolved: { type: Number, default: 0 }
});

module.exports = mongoose.model("Settings", settingsSchema);
