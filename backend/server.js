require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected ✅"))
.catch(err=>console.log(err));

app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(process.env.PORT, ()=>console.log("Server running 🚀"));