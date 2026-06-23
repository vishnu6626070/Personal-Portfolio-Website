const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const educationRoutes = require("./routes/educationRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

// Enable JSON parsing with a higher limit for Base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// API Endpoints
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", messageRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/education", educationRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio API running");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();